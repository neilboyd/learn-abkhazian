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
  el.classList.remove("fa-volume-high")
  el.classList.add("fa-pause");
}

const endPlayAudio = function (el) {
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
