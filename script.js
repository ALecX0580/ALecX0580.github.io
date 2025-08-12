// Opening Homepage
const container = document.getElementById('home-intro');
const audio = document.getElementById('story-audio');
const textEl = document.getElementById('typewriter-text');

// == Opening intro
const lines = [
  "Our planet is dying...",
  "The dessert grows with every passing year.",
  "The world is at war...",
  "...but there is hope.",
  "An object has been detected deep within the Great Banded dessert.",
  "It has been called the Jaraci Object...",
  "The Primary Anomaly.",
  "We believe it may hold the key to our salvation...",
  "An expedition to retrieve it is being prepared."
];

// Per-line custom delays
const delays = [
  4500, // 1st Line
  1000, // 2nd Line 
  2500, // 3rd Line etc..
  2000, 
  1000, 
  1000, 
  1000, 
  1500
];

// Prevents when typing has started
let typed = false;
let timeouts = [];

// Stops typing and clears screen
const clearTyping = () => {
  timeouts.forEach(clearTimeout);   // Stop all scheduled typing
  timeouts = [];                    // Reset timeout list
  textEl.innerHTML = '';            // Clear text on screen 
  typed = false;                    // Allow typing to restart
};

// Function to type each letter of line, one at a time 
const typeLines = (i = 0) => {
  if (i >= lines.length) return;

  const line = document.createElement('div');
  textEl.appendChild(line);

  let j = 0;
  const typeChar = () => {
    if (j < lines[i].length) {
      line.textContent += lines[i][j++];        //Add next letter
      timeouts.push(setTimeout(typeChar, 50));  //Wait 50ms to type again
    } else { 
        // when line is done, goes to the next one
      timeouts.push(setTimeout(() => typeLines(i + 1), delays[i] || 1000));
    }
  };

  typeChar();   // Start typing the line
};

// Mouse enter triggers playback and typing
container.addEventListener('mouseenter', () => {
  if (!typed) {     //only do this once
    audio.play();
    typeLines();
    typed = true;
  }
});

// Mouse leave stops everything
container.addEventListener('mouseleave', () => {
  audio.pause();            // pause audio
  audio.currentTime = 0;    // reset audio to beginning
  clearTyping();            // stop typing and clear the text
});

// === Pagnation Dots === Trailler Gallery
// For Gallery
const images = [
  "https://blackbirdinteractive.com/wp-content/uploads/2024/08/Homeworld-Deserts-of-Kharak-Screenshot-1.jpg",
  "https://blackbirdinteractive.com/wp-content/uploads/2024/08/Homeworld-Deserts-of-Kharak-Screenshot-2.jpg",
  "https://blackbirdinteractive.com/wp-content/uploads/2024/08/Homeworld-Deserts-of-Kharak-Screenshot-3.jpg",
  "https://blackbirdinteractive.com/wp-content/uploads/2024/08/Homeworld-Deserts-of-Kharak-Screenshot-4.jpg"
];

// Show image what dot was clicked
function showImage(index) {
  const mainImage = document.getElementById("mainImage");
  const dots = document.querySelectorAll(".trail__dot"); 
  mainImage.src = images[index];
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}
