import requests
import pymongo
from flask import Flask, render_template, jsonify

app = Flask(__name__)
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.songDB

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/song_data")
def songs_genes():
    song_list =  (db.song_data.find(projection = { 'title': True, 'genre': True }))
    options = []
    for song in song_list:
        options.append(song['title'])
        if song['genre'] not in options:
            options.append(song['genre'])
    options.sort()
    return jsonify(options)


@app.route("/genre_song.html")
def genre_song():
    return render_template("genre_song.html")

@app.route("/sentiment.html")
def sentiment():
    return render_template("sentiment.html")

@app.route("/word_analysis.html")
def word_analysis():
    return render_template("word_analysis.html")

if __name__ == "__main__":
    app.run(debug=True)