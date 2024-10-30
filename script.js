const form = document.getElementById('audioForm')
const audio_input = document.getElementById('audio-in');
const audio_player = document.getElementById('audio');
const play = document.getElementById('play');
const volume = document.getElementById('volume');
const volume_button = document.getElementById('vol/mute');
const seekControl = document.getElementById('seekControl');

const play_location = '/images/icons/play.svg';
const pause_location = '/images/icons/pause.svg';
const mute = '/images/icons/mute.svg';
const unmute = '/images/icons/volume.svg';

var pause_stat = true;
var vol_range = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = audio_input.files[0];
    
    if(file) {
        const audioURL = URL.createObjectURL(file);
        // console.log(audioURL);
        audio_player.src = audioURL;
        volume.disabled = false;
        play.src = play_location;
        pause_stat = true;
        audio_player.load();
    }
})



audio_player.addEventListener('ended', () => {
    play.src = play_location;
    pause_stat = true;
});

audio_player.addEventListener('loadedmetadata', () => {
    seekControl.max = audio_player.duration;
    // console.log(seekControl.max);
})

audio_player.addEventListener('timeupdate', () => {
    seekControl.value = audio_player.currentTime;
    // console.log(audio_player.currentTime);
});

seekControl.addEventListener('input', (event) => {
    audio_player.currentTime = event.target.value;
});



volume.addEventListener('input', (event) => {
    audio_player.volume = event.target.value;
    // console.log(event.target.value);

    if(event.target.value == 0)
    {
        volume_button.src = mute;
    }
    else {
        volume_button.src = unmute;
    }
});

// for the state of the pause and play button
function play_stat()
{
    if(pause_stat)
    {
        audio_player.play().catch(error => {
            play.src = play_location;
            pause_stat = true;
        })

        play.src = pause_location;
        pause_stat = false;
    }
    else {
        play.src = play_location;
        audio_player.pause();

        pause_stat = true;
    }
}

function volume_stat()
{
    if(audio_player.volume != 0)
    {
        vol_range = audio_player.volume;
        audio_player.volume = 0;
        volume.value = 0;
        volume_button.src = mute;
        // console.log(vol_range);
    } 
    else {
        audio_player.volume = vol_range;
        volume.value = vol_range;
        volume_button.src = unmute;
        // console.log(vol_range);
    }
    
}