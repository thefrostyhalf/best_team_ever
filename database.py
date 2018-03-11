import pymongo
import json
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.songDB
collection = db.song_data
if collection.count() > 0:
    collection.drop()
page = open("tracks_lyrics.json", 'r')
parsed = json.loads(page.read())
for item in parsed:
    collection.insert(item)