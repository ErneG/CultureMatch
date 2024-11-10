from flask import Blueprint, jsonify, request

from .service import SurveyAnalysisService

from .helpers import SurveyResponseItemsFilter, get_survey_response_items
from . import models

bp = Blueprint("main", __name__)


@bp.route("/hello", methods=["GET"])
def get_users():
    return jsonify({"hello": "world"})


@bp.route("/company", methods=["GET"])
def get_companies():
    """
    TODO: TEST ENDPOINT- REMOVE!
    """
    companies = models.Entity.query.all()
    return jsonify({"companies": [company.to_dict() for company in companies]})


@bp.route("/surveys", methods=["GET"])
def get_surveys():
    """
    TODO: TEST ENDPOINT- REMOVE!
    """
    surveys = models.Survey.query.all()
    return jsonify({"surveys": [survey.to_dict() for survey in surveys]})


@bp.route("/survey_responses", methods=["GET"])
def get_survey_responses():
    """
    TODO: TEST ENDPOINT- REMOVE!
    """
    survey_responses = models.SurveyResponse.query.all()
    return jsonify(
        {
            "survey_responses": [
                survey_response.to_dict() for survey_response in survey_responses
            ]
        }
    )


@bp.route("/survey_response_items", methods=["GET"])
def get_survey_response_items_route():
    """
    Endpoint to get survey response items with optional filtering.
    """
    # Extract query parameters
    survey_question_id = request.args.get("surveyQuestionId", type=int)
    survey_response_id = request.args.get("surveyResponseId", type=int)

    # Create filter object if any query parameter is provided
    filter_data = (
        SurveyResponseItemsFilter(
            surveyQuestionId=survey_question_id, surveyResponseId=survey_response_id
        )
        if survey_question_id is not None or survey_response_id is not None
        else None
    )

    # Get the filtered results
    survey_response_items = get_survey_response_items(filter=filter_data)

    return jsonify({"survey_response_items": survey_response_items})


survey_analysis = SurveyAnalysisService()


@bp.route("/category_survets", methods=["GET"])
def get_category_surveys():
    category_name = request.args.get("category", type=str)

    category_surveys = survey_analysis.get_category_survey_response_items(
        category=category_name
    )
    return jsonify(
        {
            # "survey_responses": [
            #     survey_response.to_dict() for survey_response in category_surveys
            # ]
            "survey_responses": [
                survey_response for survey_response in category_surveys
            ]
        }
    )


# AI specific backend DB


@bp.route("/analysed_survey_responses", methods=["GET"])
def get_analysed_survey_responses():
    survey_responses = models.SurveyResponseItemReport.query.all()
    return jsonify(
        {
            "analysed_survey_responses": [
                survey_response.to_dict() for survey_response in survey_responses
            ]
        }
    )


@bp.route("/analysed_entity", methods=["GET"])
def get_analysed_entity_trait():
    entity_traits = models.EntityTrait.query.all()
    return jsonify(
        {"analysed_entity": [entity_trait.to_dict() for entity_trait in entity_traits]}
    )
