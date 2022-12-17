const input = document.getElementById('tts-input');
const pauseButton = document.getElementById('tts-pause-button');
const playButton = document.getElementById('tts-play-button');
const output = document.getElementById('tts-output');

let paused = false;
let speechRateTSS = 1.5;

function pauseTTS() {
  paused = true;
}

function playTTS() {
  paused = false;
  readNextSentence();
}

function readNextSentence() {
  if (paused) {
    return;
  }

  const sentences = input.value.split('. ');
  if (sentences.length === 0) {
    return;
  }

  const nextSentence = sentences.shift();
  input.value = sentences.join('. ');
  output.textContent = nextSentence;

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(nextSentence);
  utterance.rate = speechRateTSS;
  synth.speak(utterance);

  setTimeout(readNextSentence, 1000);
}

pauseButton.addEventListener('click', pauseTTS);
playButton.addEventListener('click', playTTS);
