import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

const onPlay = function (currentTime) {
  const currentSeconds = currentTime.seconds;
  localStorage.setItem(STORAGE_TIME_KEY, JSON.stringify(currentSeconds));
};

player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_TIME_KEY)))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
