window.keyListener = function (e) {
  console.log('key listener', e)
  switch (e.code) {
    case 'ArrowLeft':
      console.log('left');
      e.preventDefault()
      break;
    case 'ArrowRight':
      console.log('right');
      e.preventDefault()
      break;
    case 'Space':
      console.log('space');
      e.preventDefault()
      window.dispatchEvent(new Event('foo'))
      break;
  }  
}

window.addEventListener('keydown', window.keyListener)

window.addEventListener('foo', () => console.log('window foo'))

const playAudio = function (el) {
  const audio = el.getElementsByTagName('audio')[0];
  if (audio.currentTime) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  } else {
    audio.addEventListener("play", () => startPlayAudio(el));
    audio.addEventListener("pause", () => pauseAudio(el));
    audio.addEventListener("ended", () => endPlayAudio(el));

    audio.addEventListener('foo', () => console.log('audio foo'))
    window.addEventListener('foo', () => console.log('window audio foo'))

    audio.onerror = () => errorPlayAudio(el);
    audio.play();
  }
}

const startPlayAudio = function (el) {
  el.classList.remove("fa-volume-low")
  el.classList.remove("fa-pause")
  el.classList.add("fa-volume-high");
  el.classList.add("text-info");
}

const pauseAudio = function (el) {
  console.log("pause")
  el.classList.remove("fa-volume-high")
  el.classList.add("fa-pause");
}

const endPlayAudio = function (el) {
  console.log("end")
  el.classList.remove("fa-volume-high")
  el.classList.remove("fa-pause")
  el.classList.remove("text-info");
  el.classList.add("fa-volume-low");
}

const errorPlayAudio = function (el) {
  el.classList.remove("fa-volume-high")
  el.classList.remove("text-info");
  el.classList.add("fa-volume-xmark");
  el.classList.add("text-danger");
}
