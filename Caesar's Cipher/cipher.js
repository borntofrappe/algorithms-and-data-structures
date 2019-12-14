const readline = require('readline');

function caesarCipher(letter) {
    const lastLetter = 'z'.charCodeAt(0);
    const charCode = letter.toLowerCase().charCodeAt(0);
    const code =
      charCode + 13 > lastLetter
        ? charCode - 13
        : charCode + 13;

    return String.fromCharCode(code);
}

function cipher(string) {
    return string.replace(/\w/gi, caesarCipher);
}

// retrieve the arguments passed in the console
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
const [, , ...messages] = process.argv;
if (messages.length) {
    // display the arguments as encoded strings
    messages.forEach(message => console.log(`\n${cipher(message)}`));
} else {
    // ask for input through the readline module
    // https://nodejs.org/api/readline.html#readline_readline
    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    read.question('Type something to encode/decode: ', message => {
        if(message) {
            console.log(`\n${cipher(message)}`);
        } else {
            console.log(`\n${cipher('Perhaps more than an empty string')}`);
        }
        read.close();
    });

}
