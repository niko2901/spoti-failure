const form = document.getElementById('audioForm')
const audio_input = document.getElementById('audio-in');
const audio_player = document.getElementById('audio');

form.addEventListener('submit', function(event)
{
    event.preventDefault();

    const file = audio_input.files[0];
    
    if(file) {
        const audioURL = URL.createObjectURL(file);
        console.log(audioURL);
        audio_player.src = audioURL;
        audio_player.load();
    }
})

var pause_stat = true;

function play_stat()
{
    const play = document.getElementById('play');
    const pause = document.getElementById('pause');

    if(pause_stat)
    {
        play.style.display = "none";
        pause.style.display = "block";

        pause_stat = false;
    }
    else {
        play.style.display = "block";
        pause.style.display = "none";
        
        pause_stat = true;
    }
}