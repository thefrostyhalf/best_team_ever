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

@app.route('/index2.html')
def index2():
    return render_template('index2.html')

@app.route("/song_data")
def songs_genes():
    song_list =  (db.song_data.find(projection = { 'title': True, 'genre': True, 'lyrics': True }))
    options = []
    for song in song_list:
        if song['lyrics'] != '':  
            options.append(song['title'])
            if song['genre'] not in options:
                options.append(song['genre'])
    options.sort()
    return jsonify(options)

@app.route("/song_lyrics")
def songs_lyrics_genres():
    song_db = db.song_data.find(projection = {'artist':True, 'title': True, 'genre': True, 'lyrics': True })
    options = []
    for song in song_db:
        data = {}
        if song['lyrics'] != '':  
            data['artist_title'] = song['artist'] +"-"+song['title']
            data['lyrics'] = song['lyrics']
            data['genre'] = song['genre']
            options.append(data)  
    return jsonify(options)

@app.route('/lyrics/<selection>')
def lyrics(selection):
    selected_lyrics =  (db.song_data.find({ '$or': [ { 'title': selection }, { 'genre': selection } ] }, projection = { 'lyrics': True }))
    lyrics = []
    for item in selected_lyrics:
        lyrics.append(item['lyrics'])
    lyric_string = ' '.join(lyrics)
    print(lyric_string)
    return jsonify(lyric_string)

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