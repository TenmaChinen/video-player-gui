import json
import uuid
import os
import re

def parse_string(string):
	result = re.search(r'[0-9]{1,3}', string)
	if result:
		return f'{int(result.group()):03d}'
	return string


CURRENT_DIR = os.path.basename(os.getcwd())
l_not_allowed_dirs = [CURRENT_DIR,'.vscode','.git']
TOP_DIR = os.path.abspath('..')

if 'videos' in os.listdir(TOP_DIR):
	DIR_VIDEOS = f'{TOP_DIR}/videos'
else:
	DIR_VIDEOS = f'{CURRENT_DIR}/videos'

l_files_names = os.listdir(DIR_VIDEOS)
l_files_names.sort( key = parse_string )

l_d_files = []
for item_name in l_files_names:

	if item_name in l_not_allowed_dirs: continue
	dir_path = os.path.join(DIR_VIDEOS,item_name)
	if os.path.isdir(dir_path):
		dir_name = item_name

		l_d_files.append({'chapterName':dir_name,'videos':[]})
		
		l_sub_files = os.listdir(dir_path)
		l_sub_files.sort( key = parse_string )
		
		for file_name in l_sub_files:
			if file_name.endswith('.mp4'):
				video_name = file_name[0:-4]
				l_d_files[-1]['videos'].append(video_name)

str_files = json.dumps(l_d_files)
str_files = 'const fileList = ' + str_files + " ;"

SAVE_PATH = 'directories.js'

if os.path.exists(SAVE_PATH):
	file = open(SAVE_PATH,'r')
	str_code = file.readline()
	file.close()
else:
	id_user = uuid.uuid1()
	str_code = f'const userId = "{id_user}";\n'

str_code += str_files;

file = open(SAVE_PATH,'w')
file.write(str_code)
file.close()
