window.keyListener = function (e) {
  switch (e.code) {
    case 'ArrowLeft':
      e.preventDefault();
      for (const audio of document.getElementsByTagName('audio')) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
      }
      break;
    case 'ArrowRight':
      e.preventDefault();
      for (const audio of document.getElementsByTagName('audio')) {
        if (audio.currentTime) {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        }
      }
      break;
    case 'Space':
      e.preventDefault();
      let firstPaused = null;
      for (const audio of document.getElementsByTagName('audio')) {
        if (audio.currentTime && !audio.ended) {
          if (audio.paused) {
            firstPaused ||= audio;
          } else {
            audio.pause();
          }
        }
      }
      firstPaused?.play();
      break;
  }
};

window.addEventListener('keydown', window.keyListener);

const playAudio = function (el) {
  const audio = el.getElementsByTagName('audio')[0];
  if (audio.currentTime) {
    if (audio.paused) {
      stopAll();
      audio.play();
    } else {
      audio.pause();
    }
  } else {
    audio.addEventListener('play', () => onStartPlayAudio(el));
    audio.addEventListener('pause', () => onPauseAudio(el));
    audio.addEventListener('ended', () => onEndPlayAudio(el));
    audio.onerror = () => onErrorPlayAudio(el);
    stopAll();
    audio.play();
  }
};

const stopAll = function () {
  // stop all audio before starting
  for (const audio of document.getElementsByTagName('audio')) {
    audio.pause();
  }
};

const onStartPlayAudio = function (el) {
  el.classList.remove('fa-volume-low');
  el.classList.remove('fa-pause');
  el.classList.add('fa-volume-high');
  el.classList.add('text-info');
};

const onPauseAudio = function (el) {
  el.classList.remove('fa-volume-high');
  el.classList.add('fa-pause');
};

const onEndPlayAudio = function (el) {
  el.classList.remove('fa-volume-high');
  el.classList.remove('fa-pause');
  el.classList.remove('text-info');
  el.classList.add('fa-volume-low');
};

const onErrorPlayAudio = function (el) {
  el.classList.remove('fa-volume-high');
  el.classList.remove('text-info');
  el.classList.add('fa-volume-xmark');
  el.classList.add('text-danger');
};
