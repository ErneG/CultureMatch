import sys
import os
import random
from typing import List

from .models import EntityTrait, SurveyResponseItemReport, db
from decimal import Decimal, InvalidOperation

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from ai.main import WeightedScorer, candidate_labels
from datetime import datetime, timezone
from . import helpers


# 1. get all survey data from DB (by surveyQuestionId) for each survey question
# 2. get all questions that are relevant for specifc metric (e.g. 1 and 18 for 'happiness')
# 3. generate weughts for the comments to question
# 4. write them to DB

question_keywords_map = {
    "happiness": [1, 18],
    "belonging": [2],
    "purpose": [3, 4, 11],
    "inclusion": [5],
    "learning": [6, 8],
    "support": [7],
    "flexibility": [9],
    "satisfaction": [10],
    "achievement": [12],
    "appreciation": [13, 14],
    "management": [15],
    "pressure": [16],
    "energy": [17],
    "trust": [19],
    "compensation": [20],
}


class SurveyAnalysisService:
    def __init__(self):
        self.weighted_scorer = WeightedScorer()
        self.preprocessed_surveys = []

    def get_category_survey_response_items(self, category: str):
        """
        Retrieves survey response items filtered by a specific category.

        Parameters
        ----------
        category : str
            The category used to filter and retrieve relevant survey response items.

        Returns
        -------
        list
            A list of survey response items associated with the specified category.
        """

        # Get relevant question numbers for the category
        try:
            question_nrs = question_keywords_map[category]
        except:
            return []

        # Retrieve answers to each relevant question
        results = []
        for question in question_nrs:
            surveys_filter = helpers.SurveyResponseItemsFilter(
                surveyQuestionId=question
            )
            survey_response_items = helpers.get_survey_response_items(
                filter=surveys_filter
            )

            results.extend(survey_response_items)

        return results

    def get_category_survey_response_items_report(self, category: str):
        """
        Retrieves survey response report items filtered by a specific category.

        Parameters
        ----------
        category : str
            The category used to filter and retrieve relevant survey response report items.

        Returns
        -------
        list
            A list of survey response report items associated with the specified category.
        """

        # Retrieve answers to each relevant question
        surveys_filter = helpers.SurveyResponseItemsReportFilter(keyword=category)
        return helpers.get_survey_response_items_report(filter=surveys_filter)

    def create_survey_response_item_report(
        self,
        response_item_id: int,
        weight: float,
        keyword: str,
        is_deleted=False,
    ):
        # Create an instance of SurveyResponseItemReport
        new_report = SurveyResponseItemReport(
            responseItemId=response_item_id,
            weight=weight,
            keywords=[keyword],
            isDeleted=is_deleted,
            createdAt=datetime.now(timezone.utc),
            updatedAt=datetime.now(timezone.utc),
        )

        try:
            # Add the instance to the session
            db.session.add(new_report)

            # Commit the session to save the new record to the database
            db.session.commit()
            print("New SurveyResponseItemReport created successfully")

            return new_report.to_dict()
        except Exception as e:
            # Rollback the session in case of an error
            db.session.rollback()
            print(f"Error occurred while creating SurveyResponseItemReport: {e}")
            return None

    def save_normalized_value(
        self,
        entity_id: int,
        indicator: int,
        normalized_avg: float,
    ):
        # Create a new instance of EntityTrait
        new_record = EntityTrait(
            entityId=entity_id,
            indicator=indicator,
            value=normalized_avg,
            createdAt=datetime.now(timezone.utc),
            updatedAt=datetime.now(timezone.utc),
        )

        try:
            # Add and commit the new record to the database
            db.session.add(new_record)
            db.session.commit()

            print(
                f"Record saved with entityId={entity_id}, indicator={indicator}, value={normalized_avg}"
            )
        except Exception as e:
            # Rollback the session in case of an error
            db.session.rollback()
            print(f"Error occurred while creating SurveyResponseItemReport: {e}")
            return None

    def analyse_survey_question_feedback(self):
        """
        Analyse survey questions by assigning them a weight
        """

        # Go through all relevant categories
        for keyword in question_keywords_map.keys():
            response_items = self.get_category_survey_response_items(category=keyword)

            # Get weighted score for each comment
            comments = [
                response_item["responseData"]["comment"]
                for response_item in response_items
            ]
            keywords_list = [keyword] * len(comments)

            weights = self.weighted_scorer.calculate_weighted_batch(
                input_texts=comments,
                input_keywords=keywords_list,
                alpha=0.05,
                beta=0.45,
                gamma=0.3,
                delta=0.2,
            )

            # Save each response item with the correct category (keyword)
            for response_item, weight in zip(response_items, weights):
                self.create_survey_response_item_report(
                    response_item_id=response_item["id"],
                    weight=weight,
                    keyword=keyword,
                )

    def metric_weighted_average(self, answer_results, weights):
        # Ensure the weights and answer results are of the same length
        if len(answer_results) != len(weights):
            raise ValueError("answer_results and weights must be of the same length.")

        # Calculate the weighted sum
        weighted_sum = sum(
            answer * weight for answer, weight in zip(answer_results, weights)
        )

        # Calculate the sum of the weights
        total_weight = sum(weights)

        # Avoid division by zero
        if total_weight == 0:
            return 0

        # Calculate the weighted average
        weighted_average = weighted_sum / total_weight

        # Check if min and max are the same to prevent division by zero
        min_value = min(answer_results)
        max_value = max(answer_results)

        if min_value == max_value:
            # If all values are the same, normalization isn't necessary (e.g., return a fixed value)
            normalized_average = Decimal(1)  # or set to an appropriate value as needed
        else:
            # Normalize the weighted average to the range [0, 1]
            try:
                normalized_average = (weighted_average - min_value) / (
                    max_value - min_value
                )
            except InvalidOperation:
                normalized_average = Decimal(0)

        return normalized_average

    def prepare_category_analysis_company(self):
        """
        Calculate company's score in each category
        """

        # Get statistics for each keyword
        for i, keyword in enumerate(candidate_labels):
            # Get process survey item reports
            survey_item_reports = self.get_category_survey_response_items_report(
                category=keyword
            )

            answer_results = []
            weights = []

            # Query the results for each survey item report
            for survey_item_report in survey_item_reports:
                filter = helpers.SurveyResponseItemsFilter(
                    surveyResponseId=survey_item_report["responseItemId"]
                )
                survey_items = helpers.get_survey_response_items(filter)

                if len(survey_items) < 1:
                    continue

                survey_item = survey_items[0]
                answer_result = survey_item["responseData"]["response"]
                weight = survey_item_report["weight"]

                print(f"Answer result: {answer_result}")
                print(f"Answer weight: {weight}")

                answer_results.append(answer_result)
                weights.append(weight)

            # Calculate the weighted average for this metric
            normalized_avg_keyword = self.metric_weighted_average(
                answer_results, weights
            )

            # Save metric to database
            entity = 1
            self.save_normalized_value(
                entity_id=entity,
                indicator=i,
                normalized_avg=normalized_avg_keyword,
            )

    def get_jobseeker_weighted_category_score(
        self,
        ratings: List[int],
        comments: List[str],
    ) -> List[float]:
        ratings_res = []

        for rating, comment in zip(ratings, comments):
            # Step 1: Normalize the rating (0 to 1)
            normalized_score = rating / 6

            # Step 2: Generate a random percentage between 5% and 10%
            random_percentage = random.uniform(
                0.05, 0.10
            )  # Generates a random float between 0.05 and 0.10

            # Step 3: Randomly decide whether to add or subtract the percentage
            adjustment = random_percentage * normalized_score
            if random.choice([True, False]):  # Randomly decide to add or subtract
                normalized_score += adjustment
            else:
                normalized_score -= adjustment

            # Ensure the score stays within the 0 to 1 range
            normalized_score = max(0, min(1, normalized_score))

            ratings_res.append(normalized_score)

        return ratings_res
