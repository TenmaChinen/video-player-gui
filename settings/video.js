const btnToggleList = document.getElementById("btn-toggle-list");
const videoTitle = document.getElementById("video-title");
const videoElement = document.getElementById("video-element");
const sourceElement = document.getElementById("source-element");
const trackCaption = document.getElementById("track-caption");
const btnPrevVideo = document.getElementById("btn-prev-video");
const btnNextVideo = document.getElementById("btn-next-video");
const listView = document.getElementById("list-view");
const speedElement = document.getElementById("speed");

let idxChapter = 0;
let idxVideo = 0;

setListViewVisibility(false);

fileList.forEach((chapterObj, idxChap) => {
  const chapterName = chapterObj.chapterName;
  let listItems = "";
  chapterObj.videos.forEach((videoName, idxVid) => {
    listItems += `<li onclick="onClickVideoListItem(${idxChap},${idxVid})">${videoName}</li>`
  });
  listView.innerHTML += `<li><div><span>${chapterName}</span><ul>${listItems}</ul></div><li>`;
});

loadVideo(false);
videoElement.focus();


const Key = {
  DOT: 190, COMMA: 188, ARROW_L: 37, ESC : 27,
  ARROW_R: 39, F: 70, S: 83, J: 74, K : 75, L: 76
}

/*   E V E N T S   */
videoElement.onkeydown = function (event) {
  const KEY_CODE = event.keyCode;

  if (event.shiftKey) {
    if (((KEY_CODE === Key.DOT) || (KEY_CODE === Key.ARROW_R)) && (videoElement.playbackRate < 2.0)) {
      videoElement.playbackRate += 0.25;
      showSpeed();
      
    } else if (((KEY_CODE === Key.COMMA) || (KEY_CODE === Key.ARROW_L)) && (videoElement.playbackRate > 0.25)) {
      videoElement.playbackRate -= 0.25;
      showSpeed();
    }
  } else {
    switch (KEY_CODE) {
      case Key.F:
        if (document.fullscreen) {
          videoElement.webkitExitFullScreen();
        } else {
          videoElement.requestFullscreen();
        }
        break;
      case Key.S:
        setTrackCaptionsState(!isTrackCaptionOn());
        break;
      case Key.J:
        videoElement.currentTime -= 10;
        break;
      case Key.K:
        if ( videoElement.paused) videoElement.play();
        else videoElement.pause();
        break;
      case Key.L:
        videoElement.currentTime += 10;
        break;
    }
  }
}

videoElement.onended = function (event) {
  startNextVideo();
}

let timerHideButtons;

window.onmousemove = function (event) {
  showOverlay();
  clearTimeout(timerHideButtons);
  timerHideButtons = setTimeout(hideOverlay, 5000);
}

btnNextVideo.onclick = () => startNextVideo();
btnPrevVideo.onclick = () => startPrevVideo();

listView.addEventListener("focusout", (event) => {
  setListViewVisibility(false);
});

listView.onkeydown = function (event) {
  console.log(event.keyCode);
  if (event.keyCode === Key.ESC) {
    setListViewVisibility(false);
  }
}

btnToggleList.onclick = function () {
  setListViewVisibility(true);
}

function onClickVideoListItem(idxChap, idxVid) {
  [idxChapter, idxVideo] = [idxChap, idxVid];
  setListViewVisibility(false);
  loadVideo();
}

/*   E V E N T S   */

/*   F U N C T I O N S   */

let speedTimer;

function showSpeed(){
  speedElement.innerHTML = `X ${videoElement.playbackRate}`;
  
  if(!isSpeedVisible()){
    setSpeedVisibility(true);
  }
  clearTimeout(speedTimer);
  speedTimer = setTimeout(setSpeedVisibility,1000,false);
}

function setSpeedVisibility(state){
  speedElement.style.setProperty("opacity", state ? 1 : 0);
}

function isSpeedVisible(){
  return speedElement.style.getPropertyValue("display") === "block";
}

function setListViewVisibility(state) {
  listView.style.setProperty("display", state ? "block" : "none");
  if (state) listView.focus();
}

function showOverlay() {
  btnNextVideo.style.setProperty("opacity", 1);
  btnPrevVideo.style.setProperty("opacity", 1);
  videoTitle.style.setProperty("opacity", 1);
  btnToggleList.style.setProperty("opacity", 1);
}

function hideOverlay() {
  btnNextVideo.style.setProperty("opacity", 0);
  btnPrevVideo.style.setProperty("opacity", 0);
  videoTitle.style.setProperty("opacity", 0);
  btnToggleList.style.setProperty("opacity", 0);
}


function loadVideo(play = true) {
  sourceElement.src = getCurrentVideoSource();
  trackCaption.src = getCurrentCaptionSource();
  const playbackRate = videoElement.playbackRate;
  videoElement.load();
  videoElement.playbackRate = playbackRate;
  setVideoTitle();
  if (play) videoElement.play();
}

function getCurrentVideoSource() {
  return `${getChapterName()}/${getVideoName()}.mp4`;
}

function getCurrentCaptionSource() {
  return `${getChapterName()}/${getVideoName()}.vtt`;
}

function startNextVideo() {
  if (idxVideo < fileList[idxChapter].videos.length) {
    idxVideo += 1;
    loadVideo();
  }
}

function startPrevVideo() {
  // if ( idxChapter > 0)
  if (idxVideo > 0) {
    idxVideo -= 1;
    loadVideo();
  }
}

function setVideoTitle() {
  const chapterName = getChapterName();
  const videoName = getVideoName();
  const NUM_VIDEOS = String(getChapterNumVideos()).padStart(2, "0");
  const IDX_VIDEO = String(idxVideo + 1).padStart(2, "0");
  videoTitle.innerHTML = `<h3>${chapterName}</h3><h4>${videoName} - ( ${IDX_VIDEO} / ${NUM_VIDEOS} )</h4>`;
}

/* Data Names */

function getChapterName() {
  return fileList[idxChapter].chapterName;
}

function getVideoName() {
  return fileList[idxChapter].videos[idxVideo];
}

function getChapterNumVideos() {
  return fileList[idxChapter].videos.length;
}

/* Captions */

function setTrackCaptionsState(state) {
  for (let idx = 0; idx < videoElement.textTracks.length; idx++) {
    videoElement.textTracks[idx].mode = state ? "showing" : "hidden";
  }
}

function isTrackCaptionOn() {
  for (let idx = 0, textTrack; textTrack = videoElement.textTracks[idx]; idx++) {
    if (textTrack.mode === "showing") return true;
  }
  return false;
}

/*   F U N C T I O N S   */
