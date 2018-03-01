#Dependencies
import json
import requests as req
import numpy as np
import matplotlib.pyplot as plt

tracks_sample_list = [{"artist": "Lady Gaga", "title": "Bad Romance"}]

#Dicts to collect API data
top_track_info = []

for track in tracks_sample_list:
        url = "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track['artist'] + "&q_artist=" + track['title'] + '&apikey=2ad42aad9e1f1628b2418c17e486f84b'
        response = req.get(url).content
        info = response.decode("utf-8")
        data = json.loads(info)
        #s = json.dumps(data, indent=4, sort_keys=True)
        #print(type(info))
        #top_track_info.append (response_json['callback']['body']['lyrics']['lyrics_body'])
        #print (top_track_info)
