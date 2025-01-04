import json
import os

file_path = os.path.join(os.path.dirname(__file__), 'us-colleges-and-universities@public.json')
data = None
with open(file_path, 'r') as file:
    data = json.load(file)

all_states_universities = {}

for ele in data:
    all_states_universities[ele['state']] = []
for ele in data:
    all_states_universities[ele['state']].append(ele['name'])
