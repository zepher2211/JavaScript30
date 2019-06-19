const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullScreenToggle = player.querySelector('.fullscreentoggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//flags
let progressClick = false;

const togglePlay = () => video.paused ? video.play() : video.pause();

const toggleButton = () => toggle.textContent === "►" ? toggle.textContent = "❙❙" : toggle.textContent = "►";

const skip = (e) => video.currentTime += Number(e.target.dataset.skip);

const handleRangeUpdate = (e) => video[e.target.name] = e.target.value;

const handleProgress = (e) => progressBar.style.flexBasis = `${video.currentTime/video.duration * 100}%`;

const scrub = (e) => {
    if(progressClick) video.currentTime = e.offsetX / e.target.offsetWidth * video.duration;
}

const toggleScreen = () => {
    document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', toggleButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('pause', toggleButton);
toggle.addEventListener('click', togglePlay);
progress.addEventListener('mousedown', (e) => {
    progressClick = true
    scrub(e)
});
progress.addEventListener('mouseup', () => progressClick = false);
progress.addEventListener('mousemove', scrub);
fullScreenToggle.addEventListener('click', toggleScreen)


skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


