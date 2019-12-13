# [Caesar's Cipher](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher)

## Goal

The challenge is to create a ROT13 cipher, popularly known as Caesar's Cipher. With this encoding system every letter of a message is shifted a specific number of times, 13 to be exact.

It is shifted such that the following holds true:

| Original | Encoded |
| -------- | ------- |
| a        | n       |
| b        | o       |
| t        | g       |
| g        | t       |

Notice the last two instances. These show an important trait of the cipher:

-   by running the same letter _twice_ you obtain the original value;

-   when shifting letters past `z`, you either continue starting back at `a`, or shift backwards from the chosen letter. This isn't something I actually contemplated in my own solution, where I used the first approach without thinking twice.

## Solution

The code relies on essentially two methods:

-   [`.charCodeAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

    Returns an integer for a letter at a specific index.

    ```js
    "hello".charCodeAt(0); // 104
    "hello".charCodeAt(1); // 101
    ```

    This integer represents a _UTF-16 code_

-   [`String.fromCharCode()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

    Returns a string according to the _UTF-16 code(s)_ passed as argument.

    ```js
    String.fromCharCode(104, 101); // he
    ```

    For our purposes, the opposite operation of `.charCodeAt()`.

Knowing how we can retrieve a code from a character and then turn a character back into a letter allows to implement the cipher rather intuitively.

```pseudo
for each letter

get code

shift by 13 places

return letter
```

In actual code:

```js
function caesarCipher(letter) {
    const lastLetter = "z".charCodeAt(0);
    const charCode = letter.charCodeAt(0);
    const code = charCode + 13 > lastLetter ? charCode - 13 : charCode + 13;

    return String.fromCharCode(code);
}
```

Notice the use of the ternary operator. As we attested earlier, it is possible to shift backwards when a letter would otherwise reach past the end of the alphabet.

In a previous attempt, which you might find in one of the projects I developed, I actually went through the hassle of shifting places until `z` and then continue back from `a`.

```js
function caesarCipher(letter) {
    const firstLetter = "a".charCodeAt(0);
    const lastLetter = "z".charCodeAt(0);
    const charCode = letter.toLowerCase().charCodeAt(0);
    const code = charCode + 13 > lastLetter ? firstLetter + (charCode + 12 - lastLetter) : charCode + 13;

    return String.fromCharCode(code);
}
```

In both cases, with the cipher-ing function completed, the input string can be altered by looping through the string one character at a time and returning the desired value.

**This is not actually my final solution**, but it works to show a different attempt:

```js
function cipher(string) {
    return string
        .split("")
        .map(letter => caesarCipher(letter))
        .join("");
}
```

This works as intended, but only as long as the input string is made up of letters.

```js
cipher("something"); // "fbzrguvat"
```

If you add other values, the shift operation still occurs, with unintended consequences.

```js
cipher("something "); // fbzrguvat-
```

You can update the cipher-ing function to account for letters, values greater than `a`, but less than `z` (extremes included), but JavaScript provides a handy helper is regular expressions.

Speaking of regular expressions, there exist a function on the `String` object to replace an expression, or pattern, following a set of instructions: [`.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

This is actually the third and final method introduced in the project, and it allows to make due without the `split-map-join` sequence.

```js
function cipher(string) {
    return string.replace(/\w/g, caesarCipher);
}
```

What is extremely helpful, beside the ability to automatically target every letter in the input string through the special character and the global flag, is that the `replace()` method accepts as a second argument a function. This function automatically receives as its first argument the character(s) matching the expressions, which in our instance are the different letters.

This means the `caesarCipher` function doesn't really need to be updated.

```js
function caesarCipher(letter) {
    const lastLetter = "z".charCodeAt(0);
    const charCode = letter.charCodeAt(0);
    const code = charCode + 13 > lastLetter ? charCode - 13 : charCode + 13;

    return String.fromCharCode(code);
}
```

And the challenge is completed with a much shorter syntax.

## Projects

The challenge at hand spawned a series of projects, using the cipher's own logic with a variety of frameworks and goals.

-   **Vanilla JavaScript**. Bare-bone website implementing the cipher with an input of type text and a heading.

-   [Svelte](https://svelte.dev/repl/dfc6983e51b14fa5bcb941fe1afc614f). Implemented on Svelte's own REPL, an excuse to showcase a reactive variable.

-   [React](https://codepen.io/borntofrappe/pen/MWYePYa). Implemented on CodePen, an excuse to use hooks.

-   **script.js**. This script can actually be run in a terminal equipped with node. Type `node script` to display the encoded message.

-   **cipher.js**. This script updates the logic described in `script.js` to encode strings passed as arguments of the node command. Type `node cipher something`, or `node cipher "something else" "indeed"` and the characters are encoded and logged in the console. <!-- for reference: `fbzrguvat` and `fbzrguvat ryfr \n vaqrrq` -->
