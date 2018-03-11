import requests
import pymongo
from flask import Flask, render_template

app = Flask(__name__)
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.songDB

@app.route("/")
def index():
    song_data =  list(db.song_data.find())
    return render_template("index.html")

@app.route("/genre_song")
def reference():
    song_data = list(db.song_data.find())
    return render_template("genre_song.html")

@app.route("/word_analysis")
def reference():
    song_data = list(db.song_data.find())
    return render_template("word_analysis.html")

if __name__ == "__main__":
    app.run(debug=True)