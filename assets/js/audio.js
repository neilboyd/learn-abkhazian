window.keyListener = function (e) {
  console.log('key listener', e);
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
      for (const audio of document.getElementsByTagName('audio')) {
        if (audio.currentTime) {
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        }
      }
      break;
  }
};

window.addEventListener('keydown', window.keyListener);

const playAudio = function (el) {
  const audio = el.getElementsByTagName('audio')[0];
  if (audio.currentTime) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  } else {
    audio.addEventListener('play', () => startPlayAudio(el));
    audio.addEventListener('pause', () => pauseAudio(el));
    audio.addEventListener('ended', () => endPlayAudio(el));
    audio.onerror = () => errorPlayAudio(el);
    audio.play();
  }
};

const startPlayAudio = function (el) {
  el.classList.remove('fa-volume-low');
  el.classList.remove('fa-pause');
  el.classList.add('fa-volume-high');
  el.classList.add('text-info');
};

const pauseAudio = function (el) {
  console.log('pause');
  el.classList.remove('fa-volume-high');
  el.classList.add('fa-pause');
};

const endPlayAudio = function (el) {
  console.log('end');
  el.classList.remove('fa-volume-high');
  el.classList.remove('fa-pause');
  el.classList.remove('text-info');
  el.classList.add('fa-volume-low');
};

const errorPlayAudio = function (el) {
  el.classList.remove('fa-volume-high');
  el.classList.remove('text-info');
  el.classList.add('fa-volume-xmark');
  el.classList.add('text-danger');
};
