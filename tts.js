// Function to read text aloud using TTS
function readText(text) {
  // Create a new TTS instance
  const tts = new SpeechSynthesisUtterance();

  // Set the text and voice of the TTS instance
  tts.text = text;
  tts.voice = speechSynthesis.getVoices()[0];

  // Add an event listener for when TTS finishes speaking
  tts.addEventListener('end', () => {
    // Code for handling the end of TTS goes here
  });

  // Start speaking the text
  speechSynthesis.speak(tts);
}

// Pause the TTS
function pauseTTS() {
  speechSynthesis.pause();
}

// Resume the TTS
function resumeTTS() {
  speechSynthesis.resume();
}

// Get references to elements on the page
const ttsInput = document.getElementById('tts-input');
const ttsPause = document.getElementById('tts-pause');
const ttsPlay = document.getElementById('tts-play');
const ttsOutput = document.getElementById('tts-output');

// Add event listeners to control TTS
ttsPause.addEventListener('click', () => {
  pauseTTS();
});

ttsPlay.addEventListener('click', () => {
  resumeTTS();
});

// Read text aloud as it is entered in the textbox
ttsInput.addEventListener('input', () => {
  const input = ttsInput.value;
  readText(input);
  ttsOutput.innerText = input;
});
