const audioModule = (function () {
  let lastPlayed = null;

  const keyListener = function (e) {
    switch (e.code) {
      case 'ArrowLeft':
        if (lastPlayed?.currentTime && !lastPlayed.paused) {
          lastPlayed.currentTime -= 10;
        }
        break;
      case 'ArrowRight':
        if (lastPlayed?.currentTime && !lastPlayed.paused) {
          lastPlayed.currentTime += 10;
        }
        break;
      case 'Space':
        let allPaused = true;
        for (const audio of document.getElementsByTagName('audio')) {
          if (!audio.paused) {
            allPaused = false;
            audio.pause();
          }
        }
        if (allPaused && lastPlayed) {
          lastPlayed.play();
        }
        break;
    }
  };

  const playAudio = function (el) {
    const audio = el.getElementsByTagName('audio')[0];
    if (audio.currentTime) {
      if (audio.paused) {
        playThisOne(audio);
      } else {
        audio.pause();
      }
    } else {
      audio.addEventListener('play', () => onStartPlayAudio(el));
      audio.addEventListener('pause', () => onPauseAudio(el));
      audio.addEventListener('ended', () => onEndPlayAudio(el));
      audio.onerror = () => onErrorPlayAudio(el);
      playThisOne(audio);
    }
  };

  const playThisOne = function (thisAudio) {
    for (const audio of document.getElementsByTagName('audio')) {
      audio.pause();
    }
    thisAudio.play();
    lastPlayed = thisAudio;
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

  window.addEventListener('keydown', keyListener);

  let tooltip = document.currentScript.dataset.tooltip;
  for (const audio of document.getElementsByClassName('audio')) {
    audio.setAttribute('title', tooltip);
  }

  return {
    playAudio,
  };
})();
