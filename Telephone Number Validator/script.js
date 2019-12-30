function telephoneCheck(str) {
  return /^1? ?(\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/.test(str);
}
const numbers = [
  "555-555-5555",
  "555-5555",
  "1 456 789 4444",
  "2 (757) 622-7382",
  "(555-555-5555"
];

numbers.forEach(number => console.log(`${number} ${telephoneCheck(number) ? 'is' : 'is not'} a valid US number`))