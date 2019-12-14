# [Palindrome Checker](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker)

## Goal

Create a function which returns true or false depending on whether the input argument contains alphanumeric values creating a palindrome. A palindrome as in a word or sentence which can be read left to right or right to left with the same letters.

For instance:

```pseudo
racecar
madam
10801
```

## Solution

There might be a better approach to solve this coding challenge, but in pseudo code, here's how I went about testing that the input string is a palindrome:

-   remove non-alphanumeric characters

    ```js
    const alphanumeric = str.replace(/[\W_]/gi, "").toLowerCase();
    ```

    At first I thought the special character `\W` would be enough, as I previously used the lowercase variant to identify letters, and the uppercase variant describe the opposite to such a set. Upon reading the documentation however, I realized that the underscore `_` character is included with the letters. In other words, you could replicate `\w` as follows: `/[a-zA-Z_]/`

-   create an array out of the alphanumeric values only and identify its length.

    ```js
    const arr = alphanumeric.split("");
    const { length } = arr;
    ```

    The length is retrieved to showcase object destructuring, and to avoid repeating `arr.length` later in the project.

-   loop through half of the array to retrieve the item from the start of the array, `arr[index]` and the item from the end of the array, `arr[length - 1 - index]`.

    ```js
    for (let i = 0; i < Math.floor(length / 2); i += 1) {
        const a = arr[i];
        const b = arr[length - 1 - i];
    }
    ```

    Notice that `length - 1` is used to describe the last item, since arrays are zero-based indexed.

-   if the two don't match, return `false`

    ```js
    for (let i = 0; i < Math.floor(length / 2); i += 1) {
        const a = arr[i];
        const b = arr[length - 1 - i];
        if (a !== b) {
            return false;
        }
    }
    ```

    We don't return `true` if the two represent the same value as the `return` statement stops the execution of the function. Upon finding the first match, the function would incorrectly identify a palindrome. Upon finding the first mismatch however, we can already stop the function from continuing the for loop, as a single, failed comparison is enough to describe the absence of a palindrome.

-   following the scope of the for loop, if the function has not been stopped prematurely, return true. This means the first half of the array correctly matches the second.

    ```js
    for (let i = 0; i < Math.floor(length / 2); i += 1) {
        // check for mismatch
    }
    // all match
    return true;
    ```

It's fairly straightforward once you break it down one line at a time, but it allows to practice with very useful methods and concepts. Consider for instance the use of a regular expression, the logic around arrays and their indexes. With regards to indexes, consider one last time the for loop:

```js
for (let i = 0; i < Math.floor(length / 2); i += 1) {}
```

Using `Math.floor` means a string with an odd number of characters consider every letter but the middle one.

```pseudo
string: girafarig
length: 9

loop from i = 0 to i < 4

g === g
i === i
r === r
a === a
```

Even though the letter at the center is not considered however, you can see that checking the counter-part is unnecessary. Inefficient even. This is the same consideration which makes looping through the _entire_ array a similar, unhelpful addition.
