from flask import Blueprint, jsonify
from . import models

bp = Blueprint("main", __name__)


@bp.route("/hello", methods=["GET"])
def get_users():
    return jsonify({"hello": "world"})


@bp.route("/company", methods=["GET"])
def get_companies():
    '''
    TODO: TEST ENDPOINT- REMOVE!
    '''
    companies = models.Entity.query.all()
    return jsonify({"companies": [company.to_dict() for company in companies]})


@bp.route("/surveys", methods=["GET"])
def get_surveys():
    '''
    TODO: TEST ENDPOINT- REMOVE!
    '''
    surveys = models.Survey.query.all()
    return jsonify({"surveys": [survey.to_dict() for survey in surveys]})


@bp.route("/survey_responses", methods=["GET"])
def get_survey_responses():
    '''
    TODO: TEST ENDPOINT- REMOVE!
    '''
    survey_responses = models.SurveyResponse.query.all()
    return jsonify(
        {
            "survey_responses": [
                survey_response.to_dict() for survey_response in survey_responses
            ]
        }
    )


@bp.route("/survey_response_items", methods=["GET"])
def get_survey_response_items():
    '''
    TODO: TEST ENDPOINT- REMOVE!
    '''
    survey_response_items = models.SurveyResponseItem.query.all()
    return jsonify(
        {
            "survey_response_items": [
                survey_response_item.to_dict()
                for survey_response_item in survey_response_items
            ]
        }
    )
