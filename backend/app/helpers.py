from typing import Optional
from pydantic import BaseModel
from . import models


class SurveyResponseItemsFilter(BaseModel):
    surveyQuestionId: Optional[int] = None
    surveyResponseId: Optional[int] = None


def get_survey_response_items(filter: SurveyResponseItemsFilter = None):
    # Start with the base query
    query = models.SurveyResponseItem.query

    # Apply filters conditionally
    if filter:
        if filter.surveyQuestionId is not None:
            query = query.filter(
                models.SurveyResponseItem.surveyQuestionId == filter.surveyQuestionId
            )
        if filter.surveyResponseId is not None:
            query = query.filter(
                models.SurveyResponseItem.surveyResponseId == filter.surveyResponseId
            )

    # Execute the query and return the results
    survey_response_items = query.all()
    survey_response_items_dict = [
        survey_response_item.to_dict() for survey_response_item in survey_response_items
    ]
    return survey_response_items_dict
