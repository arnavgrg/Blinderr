from flask import Flask
from flask_debug import Debug
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == "__main__":
    Debug(app)
    app.run(debug=True)
