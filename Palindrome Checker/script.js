function palindrome(str) {
  const alphanumeric = str.replace(/[\W_]/gi, '').toLowerCase();

  const arr = alphanumeric.split('');
  const { length } = arr;

  for (let i = 0; i < Math.floor(length / 2); i += 1) {
    const a = arr[i];
    const b = arr[length - 1 - i];
    if (a !== b) {
      return false;
    }
  }
  return true;
}

console.log(palindrome('race CAR'));
