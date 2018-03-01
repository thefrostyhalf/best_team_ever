#Dependencies
import json
import requests as req
import numpy as np
import matplotlib.pyplot as plt

tracks_sample_list = [{"artist": "Lady Gaga", "title": "Bad Romance"}]

#Dicts to collect API data
top_track_info = []

for track in tracks_sample_list:
        url = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + track['artist'] + "&q_artist=" + track['title'] + '&apikey=2ad42aad9e1f1628b2418c17e486f84b'
        print (url)

