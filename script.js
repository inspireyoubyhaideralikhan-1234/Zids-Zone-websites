const cards = document.querySelectorAll('.letter-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const letter = card.querySelector('.big-letter')?.innerText;
        const word = card.querySelector('.word')?.innerText;
        if (!letter || !word) return;
        const speech = new SpeechSynthesisUtterance(`${letter} for ${word}`);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Animal sound functionality
const animalCards = document.querySelectorAll('.animal-card');

animalCards.forEach(card => {
    card.addEventListener('click', () => {
        const animalName = card.querySelector('.animal-name')?.innerText.toLowerCase();
        if (!animalName) return;

        // Find and play the corresponding audio element
        const audioElement = document.getElementById(`${animalName}-sound`);
        if (audioElement) {
            // Stop any currently playing audio
            document.querySelectorAll('audio').forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });

            // Play the selected animal sound
            audioElement.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    });
});

// Color functionality
const colorCards = document.querySelectorAll('.color-card');

colorCards.forEach(card => {
    card.addEventListener('click', () => {
        const colorName = card.querySelector('.color-label')?.innerText;
        if (!colorName) return;
        const speech = new SpeechSynthesisUtterance(colorName);
        speech.rate = 0.85;
        speech.pitch = 2;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Day functionality
const dayCards = document.querySelectorAll('.day-card');

dayCards.forEach(card => {
    card.addEventListener('click', () => {
        const dayName = card.querySelector('.day-name')?.innerText;
        if (!dayName) return;
        const speech = new SpeechSynthesisUtterance(dayName);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Month functionality
const monthCards = document.querySelectorAll('.month-card');

monthCards.forEach(card => {
    card.addEventListener('click', () => {
        const monthName = card.querySelector('.month-name')?.innerText;
        if (!monthName) return;
        const speech = new SpeechSynthesisUtterance(monthName);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Vegetable functionality
const vegCards = document.querySelectorAll('.veg-card');

vegCards.forEach(card => {
    card.addEventListener('click', () => {
        const vegName = card.querySelector('.veg-name')?.innerText;
        if (!vegName) return;
        const speech = new SpeechSynthesisUtterance(vegName);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Rhyme functionality
const rhymeCards = document.querySelectorAll('.rhyme-card');

rhymeCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.rhyme-title')?.innerText;
        const lines = card.querySelectorAll('.rhyme-lines li');
        let rhymeText = title + '. ';
        lines.forEach(li => {
            rhymeText += li.innerText + ' ';
        });
        const speech = new SpeechSynthesisUtterance(rhymeText);
        speech.rate = 0.5;
        speech.pitch = 1.5;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});



// Number functionality
const numberCards = document.querySelectorAll('.number-card');

numberCards.forEach(card => {
    card.addEventListener('click', () => {
        const number = card.innerText;
        if (!number) return;
        const speech = new SpeechSynthesisUtterance(number);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Table functionality
const tableBlocks = document.querySelectorAll('.table-block');

tableBlocks.forEach(block => {
    block.style.cursor = 'pointer';
    block.addEventListener('click', () => {
        const tableHeader = block.querySelector('.table-header')?.innerText;
        const tableRows = block.querySelectorAll('.table-row');

        if (!tableHeader || tableRows.length === 0) return;

        let tableContent = tableHeader + '. ';

        tableRows.forEach((row, index) => {
            const spans = row.querySelectorAll('span');
            if (spans.length >= 3) {
                const num1 = spans[0].innerText;
                const operator = spans[1].innerText;
                const result = spans[2].innerText;
                tableContent += `${num1} ${operator} ${result}. `;
            }
        });

        const speech = new SpeechSynthesisUtterance(tableContent);
        speech.rate = 0.85;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});

// Function to handle the speaking logic
const speakRhyme = (text) => {
    // 1. Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 2. Set kid-friendly properties
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    
    // 3. Pick a voice (crucial for some browsers)
    const voices = window.speechSynthesis.getVoices();
    // Try to find a nice English voice, otherwise use the first one
    utterance.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];

    console.log("Attempting to speak:", text);
    window.speechSynthesis.speak(utterance);
};

// Wait for voices to be loaded (specific fix for Chrome/Edge)
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded and ready!");
};

document.querySelectorAll('.rhyme-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.rhyme-title').innerText;
        const lines = card.querySelectorAll('.rhyme-lines li');
        const textToRead = `${title}. ${Array.from(lines).map(li => li.innerText).join('. ')}`;
        
        speakRhyme(textToRead);
    });
});

function speakForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
        speak("Please fill all fields");
        return;
    }

    speak(`Hello ${name}, your message has been submitted successfully`);
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    speak("Form cleared");
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}