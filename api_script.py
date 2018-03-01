#Dependencies
import json
import requests as req
import numpy as np
import matplotlib.pyplot as plt

tracks_sample_list = [{"artist": "Lady Gaga", "title": "Bad Romance"}]

#Dicts to collect API data
top_track_info = []

for track in tracks_sample_list:
    for key, value in track.items(): 
        print (value)
