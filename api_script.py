#Dependencies
import json
import requests as req
import numpy as np
import matplotlib.pyplot as plt
import re
from tracklist import track_list

#tracks_sample_list = [{"artist": "Lady Gaga", "title": "Bad Romance", "genre": "pop"}]

#Dicts to collect API data

for track in track_list:
        url = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&q_track=" + track['artist'] + "&q_artist=" + track['title'] + '&apikey=2ad42aad9e1f1628b2418c17e486f84b'
        response_json = req.get(url).json()
        try:
                lyrics = response_json['message']['body']['lyrics']['lyrics_body'].replace("\n", ' ')
                lyrics = lyrics.replace("******* This Lyrics is NOT for Commercial use *******", '')
                track.update({'lyrics': lyrics})
        except:
                print (response_json)

with open('tracks_lyrics.json', 'w') as fout:
    json.dump(track_list, fout)

