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

  console.log(cipher('I got a secret')); // v tbg n frperg