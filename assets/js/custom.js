function playAudio(el) {
  const audio = el.getElementsByTagName('audio')[0];
  audio.addEventListener("play", () => startPlayAudio(el));
  audio.addEventListener("ended", () => endPlayAudio(el));
  audio.onerror = () => errorPlayAudio(el);
  audio.play()
}

function startPlayAudio(el) {
  el.classList.remove("fa-volume-low")
  el.classList.add("fa-volume-high");
  el.classList.add("text-info");
}

function endPlayAudio(el) {
  el.classList.remove("fa-volume-high")
  el.classList.remove("text-info");
  el.classList.add("fa-volume-low");
}

function errorPlayAudio(el) {
  el.classList.add("text-danger");
  endPlayAudio(el);
}
