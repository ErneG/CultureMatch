import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from ai.main import WeightedScorer

from . import helpers


# 1. get all survey data from DB (by surveyQuestionId) for each survey question
# 2. get all questions that are relevant for specifc metric (e.g. 1 and 18 for 'happiness')

question_map = {
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
            question_nrs = question_map[category]
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
