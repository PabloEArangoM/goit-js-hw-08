import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = document.getElementById('vimeo-player');

const player = new Player(vimeoPlayer);

const savePlaybackTime = throttle(async () => {
    try {
        const currentTime = await player.getCurrentTime();
        localStorage.setItem('videoplayer-current-time', currentTime);
    } catch (error) {
        console.error('Error al guardar el tiempo de reproducción:', error);
    }
}, 1000); 

async function loadAndSetPlaybackTime() {
    try {
        const savedTime = localStorage.getItem('videoplayer-current-time');
        if (savedTime !== null) {
            await player.setCurrentTime(parseFloat(savedTime));
        }

        player.on('timeupdate', savePlaybackTime);
    } catch (error) {
        console.error('Error al cargar y configurar el tiempo de reproducción:', error);
    }
}

loadAndSetPlaybackTime();

