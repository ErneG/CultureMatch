from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/hello', methods=['GET'])
def get_users():
    return jsonify({
        "hello": "world"
    })
