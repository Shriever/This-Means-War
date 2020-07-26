from flask import *

app = Flask(__name__)

@app.route("/")
def war():
    return render_template("index.html")