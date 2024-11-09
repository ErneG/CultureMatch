from flask import Blueprint, jsonify
from . import models

bp = Blueprint('main', __name__)

@bp.route('/hello', methods=['GET'])
def get_users():
    return jsonify({
        "hello": "world"
    })


# @bp.route('/company', methods=['GET'])
# def get_companies():
#     companies = models.Entity.query.all()
#     return jsonify({
#         "companies": [company.to_dict() for company in companies]
#     })