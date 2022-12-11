// Global variables for the TTS
// Initialize the global variables for the TTS
var ttsInput = document.getElementById("tts-input");
var ttsOutput = document.getElementById("tts-output");
var ttsVoiceSelect = document.getElementById("tts-voice-select");
var ttsSpeed = document.getElementById("tts-speed");
var ttsPlayPause = document.getElementById("tts-play-pause");
var ttsVoices = window.speechSynthesis.getVoices();
var isPlaying = false;
var currentSentenceIndex = 0;
var currentSentence = "";
var currentVoice = ttsVoices[0].name;
var currentSpeed = 1;
var sentences;

// Initialize the TTS
function initTTS() {
  // Set up the global variables for the TTS
  ttsInput = document.getElementById("tts-input");
  ttsOutput = document.getElementById("tts-output");
  ttsVoiceSelect = document.getElementById("tts-voice-select");
  ttsSpeed = document.getElementById("tts-speed");
  ttsPlayPause = document.getElementById("tts-play-pause");

  // Get the available voices from the TTS library
  ttsVoices = window.speechSynthesis.getVoices();

  // Populate the voice select element with the available voices
  for (var i = 0; i < ttsVoices.length; i++) {
    var voice = ttsVoices[i];
    var option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = voice.name;
    ttsVoiceSelect.appendChild(option);
  }

  // Set the default voice to the first available voice
  currentVoice = ttsVoices[0].name;

  // Set the default speed to 1x
  currentSpeed = 1;

  // Set the isPlaying flag to false
  isPlaying = false;
}

// This function will be called when the user changes the input text
function onInputChange() {
  // Get the input text
  var input = ttsInput.value;

  // Split the input text into sentences
  sentences = input.split(/[.!?]/g);

  // Set the current sentence index to 0
  currentSentenceIndex = 0;

  // Set the current sentence to the first sentence
  currentSentence = sentences[currentSentenceIndex];

  // Set the text of the output element to the current sentence
  ttsOutput.innerHTML = currentSentence;
}

// This function will be called when the user changes the TTS voice
function onVoiceChange() {
  // Update the current voice to the selected voice
  currentVoice = ttsVoiceSelect.value;
}


// This function will be called when the user changes the TTS speed
function onSpeedChange() {
  // Get the selected speed from the tts-speed element
  var speed = ttsSpeed.options[ttsSpeed.selectedIndex].value;

  // Set the current speed to the selected speed
  currentSpeed = parseFloat(speed);

  // If the TTS is currently playing, update the speed of the current utterance
  if (isPlaying) {
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(currentSentence);
    for (var i = 0; i < ttsVoices.length; i++) {
      if (ttsVoices[i].name === currentVoice) {
        utterance.voice = ttsVoices[i];
        break;
      }
    }
    utterance.rate = currentSpeed;
    utterance.onend = onSentenceEnd;
    window.speechSynthesis.speak(utterance);
  }
}

// This function will be called when a sentence finishes speaking
function onSentenceEnd() {
  // Increment the current sentence index
  currentSentenceIndex++;

  // If there are more sentences, speak the next sentence
  if (currentSentenceIndex < sentences.length) {
    // Set the current sentence to the next sentence
    currentSentence = sentences[currentSentenceIndex];

    // Set the text of the output element to the current sentence
    ttsOutput.innerHTML = currentSentence;

    // Create a new utterance for the current sentence
    var utterance = new SpeechSynthesisUtterance(currentSentence);

    // Set the voice of the utterance to the current voice
    for (var i = 0; i < ttsVoices.length; i++) {
      if (ttsVoices[i].name === currentVoice) {
        utterance.voice = ttsVoices[i];
        break;
      }
    }

    // Set the speed of the utterance to the current speed
    utterance.rate = currentSpeed;

    // Set the onend event listener for the utterance
    utterance.onend = onSentenceEnd;

    // Speak the current sentence
    window.speechSynthesis.speak(utterance);
  }
  // If there are no more sentences, stop the TTS
  else {
    // Stop the current utterance
    window.speechSynthesis.cancel();

    // Update the play/pause button text
    ttsPlayPause.innerHTML = "Play";

    // Set the isPlaying flag to false
    isPlaying = false;
  }
}

// This function will be called when the user clicks the Play/Pause button
function toggleTTS() {
  // If the TTS is currently playing, pause it
  if (isPlaying) {
    // Stop the current utterance
    window.speechSynthesis.cancel();

    // Update the play/pause button text
    ttsPlayPause.innerHTML = "Play";

    // Set the isPlaying flag to false
    isPlaying = false;
  }
  // If the TTS is not currently playing, start it
  else if (!isPlaying){
    // Get the input text
    var input = ttsInput.value;

    // Split the input text into sentences
    sentences = input.split(/[.!?]/g);

    // Set the current sentence index to 0
    currentSentenceIndex = 0;

    // Set the current sentence to the first sentence
    currentSentence = sentences[currentSentenceIndex];

    // Set the text of the output element to the current sentence
    ttsOutput.innerHTML = currentSentence;

    // Create a new utterance for the current sentence
    var utterance = new SpeechSynthesisUtterance(currentSentence);

    // Set the voice of the utterance to the current voice
    for (var i = 0; i < ttsVoices.length; i++) {
      if (ttsVoices[i].name === currentVoice) {
        utterance.voice = ttsVoices[i];
        break;
      }
      
    }

    // Set the speed of the utterance to the current speed
    utterance.rate = currentSpeed;

    // Set the onend event listener for the utterance
    utterance.onend = onSentenceEnd;
    //TODO: I think this hass something to do with the utterarnces?
    // Start speaking the utterance
    window.speechSynthesis.speak(utterance);

    // Update the play/pause button text
    ttsPlayPause.innerHTML = "Pause";


  }
}
