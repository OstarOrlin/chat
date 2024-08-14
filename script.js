// Check for browser support for SpeechRecognition and SpeechSynthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechSynthesis = window.speechSynthesis;

// Initialize recognition and synthesis objects
const recognition = new SpeechRecognition();
const synth = SpeechSynthesis;

// Variables to store elements
const startBtn = document.getElementById('start-btn');
const transcriptEl = document.getElementById('transcript');
const responseEl = document.getElementById('response');

// Configure recognition settings
recognition.lang = 'es-ES'; // Change the language as needed
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Handle recognition results
recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    transcriptEl.textContent = `You said: ${speechToText}`;
    processCommand(speechToText);
};

// Handle recognition errors
recognition.onerror = (event) => {
    transcriptEl.textContent = `Error occurred: ${event.error}`;
};

// Start recognition when the button is clicked
startBtn.addEventListener('click', () => {
    recognition.start();
});

// Function to process the recognized command
function processCommand(command) {
    let responseText;

    if (command.includes('hola')) {
        responseText = 'Hola, ¿cómo puedo ayudarte?';
    } else if (command.includes('tiempo')) {
        responseText = 'Actualmente está soleado y agradable.';
    } else if (command.includes('chiste')) {
        responseText = '¿Por qué la computadora fue al médico? Porque tenía un virus.';
    } else {
        responseText = 'Lo siento, no entiendo esa orden.';
    }

    responseEl.textContent = responseText;
    speak(responseText);
}

// Function to speak the response
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Change the language as needed
    synth.speak(utterance);
}
