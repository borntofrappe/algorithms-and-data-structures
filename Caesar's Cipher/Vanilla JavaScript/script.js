const form = document.querySelector("form");
const input = document.querySelector("input");
const heading = document.querySelector("h1");

// function called on each letter following the .replace function
function caesarCipher(match) {
    const firstLetter = "a".charCodeAt(0);
    const lastLetter = "z".charCodeAt(0);
    const charCode = match.toLowerCase().charCodeAt(0);
    const code = charCode + 13 > lastLetter ? firstLetter + (charCode + 12 - lastLetter) : charCode + 13;

    return String.fromCharCode(code);
}

// use the current value for the initial value of the heading
heading.textContent = input.value.replace(/\w/gi, caesarCipher);

// update the text following the input event
input.addEventListener("input", e => (heading.textContent = e.target.value.replace(/\w/gi, caesarCipher)));

form.addEventListener("submit", e => e.preventDefault());