import sys
import os

from .models import SurveyResponseItemReport, db

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from ai.main import WeightedScorer
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
