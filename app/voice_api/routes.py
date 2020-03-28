from flask import Blueprint

voice_api = Blueprint('voice_api', __name__)


@voice_api.route("/test")
def test():
    return "Test Successful"
