//select the page elements in the html
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const full=player.querySelector('.full');

function togglePlay(){
    if(video.paused){
        video.play();
    }
    else {video.pause()};
    // or
    //const method
}

//update the button
function updateButton(){
    const icon= video.paused ? '►' : '❚ ❚'; //changing the button
    toggle.textContent =icon; //update the button
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges(){
    video[this.name]=this.value;
}

function handleProgressBar(){
    //change the ProgressBar to 100%
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`
}

function scrub(e){
    const scrubTime= (e.offsetX/progress.offsetWidth) *video.duration;
    video.currentTime= scrubTime;
    console.log(e)
}

//hook up with the eventlistener
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);

video.addEventListener('timeupdate',handleProgressBar);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRanges));
ranges.forEach(range=>range.addEventListener('mousemove',handleRanges));

let mousedown= false;
progress.addEventListener('click',scrub);

progress.addEventListener('mousemove',(e)=>mousedown && scrub(e) );

progress.addEventListener('mousedown',()=> mousedown= true);
progress.addEventListener('mouseup',()=> mousedown= false);



function handleFullScreen(){
    video.requestFullscreen()
}
full.addEventListener('click',handleFullScreen);