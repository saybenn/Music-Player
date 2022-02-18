const musicContainer = document.getElementById('music-container'),
 playBtn = document.getElementById('play'),
 prevBtn = document.getElementById('prev'),
 nextBtn = document.getElementById('next'),
 audio = document.getElementById('audio'),
 progress = document.getElementById('progress'),
 progressContainer = document.getElementById('progress-container'),
 title = document.getElementById('title'),
 artist = document.getElementById('artist'),
 cover = document.getElementById('cover');

//Song Titles
const songs = [ 
    {title: 'Project 8', artist: 'Robb Bank$'},
    {title: 'ILoveUIHateU', artist: 'Playboi Carti'},
    {title: 'Smoke Up', artist: 'Levi Carter'}, 
    {title: 'Purple Kisses', artist: 'A$AP Rocky'},
    {title: 'Triple S', artist: 'YN Jay'},
    {title: 'Over', artist: 'Playboi Carti'}
];


//Keep track of song
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `music/${song.title}.mp3`;
    cover.src = `Images/${song.title}.jpg`;
}

//Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//previous song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong() {
    songIndex++;

    if(songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//time/song update
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener('click', setProgress);

//song ends
audio.addEventListener('ended', nextSong);