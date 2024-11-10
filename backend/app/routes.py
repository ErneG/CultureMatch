from flask import Blueprint, jsonify, request

from .service import SurveyAnalysisService

from .helpers import (
    EntityFilter,
    JobListingFilter,
    SurveyResponseItemsFilter,
    get_company,
    get_job_listings,
    get_survey_response_items,
)
from . import models

bp = Blueprint("main", __name__)


@bp.route("/hello", methods=["GET"])
def get_users():
    return jsonify({"hello": "world"})


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


# AI specific backend DB
survey_analysis = SurveyAnalysisService()


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


@bp.route("/init_analysis", methods=["POST"])
def post_init_analysis():
    survey_analysis.analyse_survey_question_feedback()
    return jsonify({"result": "analysis OK"})


@bp.route("/create_metrics", methods=["POST"])
def post_create_company_metrics():
    survey_analysis.prepare_category_analysis_company()
    return jsonify({"result": "analysis OK"})


# Frontend communication

# Set up analysis categories
keywords = [
    "happiness",
    "belonging",
    "purpose",
    "inclusion",
    "learning",
    "support",
    "flexibility",
    "satisfaction",
    "achievement",
    "appreciation",
    "management",
    "pressure",
    "energy",
    "trust",
    "compensation",
]


@bp.route("/company_metrics", methods=["GET"])
def get_company_metrics():
    # Provide company scores for the employer dashboard
    entity_traits = models.EntityTrait.query.all()
    entity_scores = [et.to_dict()["value"] for et in entity_traits]

    result = dict(zip(keywords, entity_scores))
    return jsonify(result)


@bp.route("/recommend_jobs", methods=["POST"])
def get_jobseeker_recommended_jobs():
    # Get JSON data from the request
    data = request.get_json()

    # Check if data is provided and if 'results' and 'profession' are in the JSON
    if not data or "results" not in data or "profession" not in data:
        return (
            jsonify({"error": "Invalid JSON or missing 'results' or 'profession'"}),
            400,
        )

    # Extract results and create separate lists for values and elaborations
    profession = data["profession"]
    results = data["results"]
    values_list = [entry["value"] for entry in results.values()]
    elaborations_list = [entry["elaboration"] for entry in results.values()]

    # Weightet score of values
    scores = survey_analysis.get_jobseeker_weighted_category_score(
        ratings=values_list,
        comments=elaborations_list,
    )

    # Retrieve most similar jobs (with their respective companies)
    job_filter = JobListingFilter(title=profession)
    # job_suggestions = get_job_listings(filter=job_filter)
    job_suggestions = get_job_listings(limit=5)

    results = []
    for job_suggestion in job_suggestions:
        company_filter = EntityFilter(entityId=job_suggestion["entityId"])
        company_info = get_company(filter=company_filter)[0]

        # Format the output job listing object
        result = {
            "job": job_suggestion,
            "company": company_info,
        }
        results.append(result)

    # Return the lists for confirmation (or you could store them as needed)
    # return jsonify({"scores": scores})
    return jsonify(results)
