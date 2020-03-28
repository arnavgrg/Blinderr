from flask import Flask
from voice.routes import voice_api

app = Flask(__name__)

app.register_blueprint(voice_api)


@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
