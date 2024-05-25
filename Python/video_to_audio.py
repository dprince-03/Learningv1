import moviepy.editor

# read video file
video_file = moviepy.editor.VideoFileClip(r'"C:\Users\princ\Downloads\3285763128078620645.mp4"')

# Convert video data to audio
audio = video_file.audio

#save audio file

audio.write_audiofile('for_Bishop.mp3')




# import requests
# import json

# # Define the inputBody and headers
# input_body = {
#     "tasks": {
#         "import": {
#             "operation": "import/upload"
#         },
#         "convert": {
#             "operation": "convert",
#             "input": "import",
#             "input_format": "mp4",
#             "output_format": "mp3",
#             "options": {
#                 "audio_codec": "auto",
#                 "audio_filter_volume": 100,
#                 "audio_filter_fade_in": false,
#                 "audio_filter_fade_out": false,
#                 "audio_filter_reverse": false,
#                 "cut_start": "00:00:00",
#                 "cut_end": "00:00:00"
#             }
#         },
#         "export-url": {
#             "operation": "export/url",
#             "input": [
#                 "convert"
#             ]
#         }
#     }
# } 

# headers = {
#     'Content-Type': 'application/json',
#     'Accept': 'application/json',
#     'Authorization': 'Bearer {access-token}'
# }

# url = "https://api.freeconvert.com/v1/process/jobs"

# # Make a POST request and print the response
# response = requests.post(url, data=json.dumps(input_body), headers=headers)

# if response.status_code == 200:
#     response_json = response.json()
#     print(response_json)
# else:
#     print(f"Request failed with status code: {response.status_code}")
#     print(response.text)
