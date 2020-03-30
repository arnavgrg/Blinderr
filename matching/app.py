import json
from flask import Flask, request, jsonify
from matching import Matching
app = Flask(__name__)


@app.route('/getMatches', methods=['GET', 'POST'])
def matching():
    if request.method == 'POST':
        content = request.get_json(force=True)
        payload = dict()
        payload["user_ids"] = content.get('user_ids')
        payload["desc"] = content.get('descriptions')
        matcher = Matching(payload)
        matches = matcher.get_matches()
        return jsonify(matches)

