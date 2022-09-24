import json
import os
import re

def parse_string(string):
	result = re.search(r'[0-9]{1,3}', string)
	if result:
		return f'{int(result.group()):03d}'
	return string


l_files = []
CURRENT_DIR = os.path.basename(os.getcwd())
l_not_allowed_dirs = [CURRENT_DIR,'.vscode','.git']
TOP_DIR = os.path.abspath('..')
VIDEOS_DIR = os.path.join(TOP_DIR,'videos')
l_top_files = os.listdir(VIDEOS_DIR)

l_top_files.sort( key = parse_string )

for item_name in l_top_files:

	if item_name in l_not_allowed_dirs: continue
	dir_path = os.path.join(VIDEOS_DIR,item_name)
	if os.path.isdir(dir_path):
		dir_name = item_name

		l_files.append({'chapterName':dir_name,'videos':[]})
		
		l_sub_files = os.listdir(dir_path)
		l_sub_files.sort( key = parse_string )
		
		for file_name in l_sub_files:
			if file_name.endswith('.mp4'):
				video_name = file_name[0:-4]
				l_files[-1]['videos'].append(video_name)

str_code = f'const TOP_DIR = "{VIDEOS_DIR}\" ;\n'

str_files = json.dumps(l_files)
str_files = 'const fileList = ' + str_files + " ;"
str_code += str_files;

file = open('directories.js','w')
file.write(str_code)
file.close()
