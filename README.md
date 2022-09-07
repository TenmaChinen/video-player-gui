# video-player-gui

## Description
Local browser GUI to reproduce mp4 videos showing their directory hierarchy

This app was only tested on Edge browser so far.

- There is no external libraries used for this project.
 
- This project was made entirely in JavaScript vanilla, HTML and CSS, excepting by the Python script to create a JavaScript file where the directories are specified as a constant object.

## Setup

- Clone the repository in your local machine.

- Fill the videos folder with different folders that contains the videos you want to see.

- Execute the python script contained in the settings folder from the terminal by :

```cmd
C:\video-player-gui\settings> python files_indexing.py
```

- Check inside `\settings` directory if a new file called : `directories.js` is created.

- Finally, run the webapp by executing the `index.html` file. Your videos will be shown in the same hierarchy of the folders you've created.

- If you want to add subtitles to each video, the subtitles files must have the exact name as the video file.

- Shortcuts:
  | Keys             | Action                        |
  |------------------|-------------------------------|
  | F                | Toggle full-screen mode       |
  | S                | Toggle Subtitles if available |
  | Right Shift + .  | Speeds Up video by 0.25 secs  |
  | Right Shift + ,  | Slows Down video by 0.25 secs |
  | Arrow Left       | Go back 5 seconds             |
  | Arrow Right      | Go forward 5 seconds          |
  | Escape           | Exit full-screen mode         |

## Future Work
- Allow the app to manage other video files like `.mkv`.
- Allow the Python script to target video files sparse from any part of the hierarchy.
- Add similar shortcuts and features like Youtube.
- Allow users to set custom video urls in some JSON file to make their own video hub instead of storing the videos locally.

## Screenshots
#### Sidebar menu selector

![video_player_gui_sample_1](https://user-images.githubusercontent.com/36393143/188972948-c301e392-dd58-4a96-a3eb-1d8565c67918.png)
