document.addEventListener('DOMContentLoaded', function() {
    var phrase = "Welcome to Soundscape!"; // main text here
    var words = phrase.split(' '); // Split the phrase into words
    var textContainer = document.getElementById('text-container');
// animation for the introduction
    words.forEach((word, index) => {
        var wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' '; // append a space after each word
        wordSpan.classList.add('word');
        wordSpan.style.animationDelay = `${0.5 * index}s`; // Delay each word's animation
        textContainer.appendChild(wordSpan);

        if (index === words.length - 1) {
            wordSpan.addEventListener('animationend', function() {
                textContainer.classList.add('text-top'); // Move the text to the top of the window
            });
        }
    });
});
