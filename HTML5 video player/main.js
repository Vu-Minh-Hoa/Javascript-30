const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.fullscreen__button i');

function togglePlay() {
    if( video.paused ) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function updateProgressBar() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    
    } else if (video.webkitRequestFullscreen) { 
      /* Safari */
      video.webkitRequestFullscreen();
    }
}

updateProgressBar();

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgressBar);

toggle.addEventListener('click', togglePlay);
skipButton.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate)
});

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); 

progress.addEventListener('mousedown', () => {mouseDown = true });
progress.addEventListener('mouseup', () => {mouseDown = false });

fullscreenBtn.addEventListener('click', handleFullscreen);
video.addEventListener('dblclick', handleFullscreen);

