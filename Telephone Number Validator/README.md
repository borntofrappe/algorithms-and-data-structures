# [Telephone Number Validator](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator)

## Goal

Describe whether the input string matches a valid US phone number.

## Notes

The challenge describes a series of patterns making up a valid phone number.

| Valid Number   |
| -------------- |
| 555-555-5555   |
| (555)555-5555  |
| (555) 555-5555 |
| 555 555 5555   |
| 5555555555     |
| 1 555 555 5555 |

Individually, it'd be possible to create the following expressions:

| Valid Number   | /Regular Expression/    |
| -------------- | ----------------------- |
| 555-555-5555   | `\d{3}-\d{3}-\d{4}`     |
| (555)555-5555  | `\(\d{3}\)\d{3}-\d{4}`  |
| (555) 555-5555 | `\(\d{3}\) \d{3}-\d{4}` |
| 555 555 5555   | `\d{3} \d{3} \d{4}`     |
| 5555555555     | `\d{10}`                |
| 1 555 555 5555 | `1 \d{3} \d{3} \d{4}`   |

A few notes on the expressions in the table.

- `\d` identifies a digit;

- `{x}` describes the number of characters expected to match. It'd be also possible to find the characters in a range, `{3,4}`, or in a minimum number, `{3,}`

- `\` allows to escape special characters. This is included for the parentheses, to actually look for the parens. These are a special character on their own right, and allow to refine the way a match is found. Interesting, but beyond the scope of the challenge.

- `1` specifies a hard coded value for the country code (US and apparently Canada). As per the challenge's own description, only a value of `1` is acceptable.

From the expressions, you can start to see how the differences are mostly due to whitespace, parentheses or dashes. The penultimate expression might look like a departure, asking to find an uninterrupted series of ten digits, but you can think of ten digits as a series of three characters, followed by three characters and again by four. Take the expression preceding it and remove the whitespace to see what I mean by that.

```diff
- \d{10}
+ \d{3}\d{3}\d{4}
```

Establishing this, it becomes a matter of adding a series of special characters to check for the _eventuality_, the _possibility_ of whitespace, dashes or parentheses.

To this end, [the special character `?`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-questionmark) allows to find zero or one matches.

Starting from the first expression: `\d{3}-\d{3}-\d{4}`, we can make the dashes optional as follows

```js
const regex = /\d{3}-?\d{3}-?\d{4}/;
```

Pay attention: this means the regular expression looks for a dash or **nothing whatsoever**. It does not clear the fourth, but the fifth expression.

```js
/\d{3}-?\d{3}-?\d{4}/.test("555 555 5555"); // false
/\d{3}-?\d{3}-?\d{4}/.test("5555555555"); // true
```

To check for a whitespace as well, the [special characters `[]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-character-set) allow to look for a _character set_, namely between a series of options.

```js
const regex = /\d{3}[- ]?\d{3}[- ]?\d{4}/;
```

The question mark applies to the entire set, meaning that the expression clears if there is a dash, if there is a space, if there is nothing altogether.

Three conditions match, three remain.

| Missing Number | /Regular Expression/    |
| -------------- | ----------------------- |
| (555)555-5555  | `\(\d{3}\)\d{3}-\d{4}`  |
| (555) 555-5555 | `\(\d{3}\) \d{3}-\d{4}` |
| 1 555 555 5555 | `1 \d{3} \d{3} \d{4}`   |

However, accounting for this possibilities is eerily similar to previous instances: find the character(s) which could be there and add a question mark to check for their possibility.

- Parenthesis: `\(?` and `\)?`

  Notice that the difference between the first and second expressions (the additional whitespace) is already accounted with the previous character set.

- Country code with whitespace `1? ?`.

Altogether, completing the challenge with the promised single regular expression.

```js
const regex = /(1? ?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/;
```

## Failure

Alas, the project is not over. While the regular expression accounts for the five conditions, it does so in a vacuum. Include it in [the editor provided @freecodecamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator):

```js
function telephoneCheck(str) {
  // Good luck!
  return /(1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(str);
}
```

And you'll see a considerable number of tests fail. These failure relate to instances in which the function wrongly returns `true` (false positives).

Consider the following:

```pseudo
1 456 789 44445
2 (757) 622-7382
(555-555-5555
```

In all these instances the function should return false, and yet it does not. This is because the regular expression does not account for a situation in which a valid number is present, but is also surrounded by additional characters.

The input `1 456 789 44445` returns true because `1 456 789 4444` is valid.

The input `2 (757) 622-7382` likewise because of `(757) 622-7382`.

And to reiterate the point `(555-555-5555` because of `555-555-5555`.

It becomes necessary to consider the beginning and the end of the input string, and this is allowed by the special characters [`^`]() and [`$`]().

Perhaps most importantly, it might be beneficial to also re-consider what makes a valid input number:

- start with an optional area code of `1`

  ```js
  const regex = /^1?/;
  ```

- followed by an optional whitespace

  ```js
  const regex = /^1? ?/;
  ```

- for the first three digits, consider the possibility that these might be surrounded by parenthesis. To check for a pattern _or_ another, use the `|` special character

  ```js
  const regex = /^1? ?(\d{3}|\(\d{3}\))/;
  ```

  The wrapping parenthesis allow to describe the accepted pattern, without and with parens.

- finally, and this part closely resembles the previous version, consider three characters followed by four characters. Separated by an optional dash or white space.

  ```js
  const regex = /^1? ?(\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}/;
  ```

Just like the expression should begin with an optional area code or a number, it needs to end with a specific value. In this instance the four digits. Append a `$` character and the regular expression will return false if more characters are included.

Leading us to the final, working solution.

```js
const regex = /^1? ?(\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/;
```
