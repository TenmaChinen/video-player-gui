import json
import os

l_files = []
TOP_DIR = os.path.abspath('..')
VIDEOS_DIR = os.path.join(TOP_DIR,'videos')

for item_name in os.listdir(VIDEOS_DIR):
	dir_path = os.path.join(VIDEOS_DIR,item_name)
	if os.path.isdir(dir_path) and not item_name.endswith('.git'):
		dir_name = item_name
		l_files.append({'chapterName':dir_name,'videos':[]})
		for file_name in os.listdir(dir_path):
			if file_name.endswith('.mp4'):
				video_name = file_name[0:-4]
				l_files[-1]['videos'].append(video_name)

str_files = json.dumps(l_files)
str_files = 'const fileList = ' + str_files + " ;"

file = open('directories.js','w')
file.write(str_files)
file.close()
