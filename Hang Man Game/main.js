//Actually It Is Not Important And Even Better Write It In HTML

// Letters:
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array From Letters:
let arrLetters = Array.from(letters);

//Select Letters Container:
let lettersContainer = document.querySelector(".letters");

// To Make Simple Transition:
window.onload = function () {
    lettersContainer.classList.add("full");
};

//Generate Letters:
arrLetters.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.classList.add("letter-container");
    lettersContainer.appendChild(span);
});

const words = {
    programming: ["JavaScript", "PHP", "Python", "TypeScript", "Ruby"],
    movies: [
        "Inception",
        "The Matrix",
        "Interstellar",
        "The Godfather",
        "Pulp Fiction",
    ],
    countries: ["Palestine", "Jordan", "Syria", "Indonesia", "Malaysia"],
    hobbies: ["Hiking", "Reading", "Cooking", "Photography", "Gardening"],
    sports: ["Soccer", "Basketball", "Swimming", "Tennis", "Cycling"],
};

// Get Random Property || Category:
let allKeys = Object.keys(words);
let chosenKey = allKeys[Math.floor(Math.random() * allKeys.length)]; // Get a random key from the array

// Add The Key To => (.category > span):
document.querySelector(".category span").innerHTML = chosenKey;

// Get Random Word In Random Key || Category:
let randomIndex = Math.floor(Math.random() * words[chosenKey].length); // Use The 'chosenKey' To Access The Array
let randomWord = words[chosenKey][randomIndex]; // Get A Random Word From The Chosen Array

// Disable The Draw:
const draw = document.querySelector(".hangman-draw .the-draw");

// Guessed Letters:
let guessedLettersContainer = document.querySelector(".guessed-letters");

// Convert Chosen Word To Array:
let lettersAndSpaces = Array.from(randomWord);

// Create Spans Depending On The 'lettersAndSpaces' Array:
lettersAndSpaces.forEach((letter) => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        emptySpan.className = "space";
    }
    // Add Spans To Guessed Letters Container:
    guessedLettersContainer.append(emptySpan);
});
let counter = 0;
let wins = 0;
const hangMan = document.querySelector(".hangman-draw");
// Click On Letters:
document.addEventListener("click", (e) => {
    // guessStatus:
    let guessStatus = false;

    if (e.target.className == "letter-container") {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        lettersAndSpaces.forEach((actualLetter, index) => {
            // Correct Letter Or Not:
            // 1) True:
            if (clickedLetter == actualLetter.toLowerCase()) {
                // Add Letter To Its Index In Span:
                document
                    .querySelectorAll(".guessed-letters span")
                    [index].append(clickedLetter);
                guessStatus = true;
                wins++;
                // Play Success Sound:
                document.getElementById("success").play();
            }
        });
        // 2) False:
        if (!guessStatus) {
            draw.classList.add(`wrong-${counter + 1}`);
            counter++;
            // Play Fail Sound:
            document.getElementById("fail").play();
            if (counter == 8) {
                endGameIfLost();
            }
        }
        if (wins == randomWord.length) {
            endGameIfWon();
        }
    }
});

// DRY Reasons:
let final = document.querySelector("div.win-lose");
function disablingBackGround(win = false) {
    lettersContainer.classList.add("disabled");
    draw.classList.add("disabled");
    final.style.opacity = "1";
    final.style.zIndex = "3";
    let tryAgain = document.createElement("span");
    tryAgain.className = "try-again";
    tryAgain.innerHTML = `${win ? "Replay" : "Try Again"}`;
    final.appendChild(tryAgain);
    tryAgain.onclick = function () {
        location.reload();
    };
}

// Finally, The Result Functions:
function endGameIfLost() {
    final.innerHTML = `<span class='lose-word'>You Lost!</span> The Correct Word is: <span>${randomWord}</span>`;
    disablingBackGround();
}

function endGameIfWon() {
    final.innerHTML =
        "<span class='won-word'>You Won!</span> Thanks For Playing:)";
    disablingBackGround(true);
}
