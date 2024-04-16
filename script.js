const morseCodeDict = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', ' ': '/', '/': '-..-.', '.': '.-.-.-', '-': '-....-'
};

const reverseMorseCodeDict = Object.fromEntries(Object.entries(morseCodeDict).map(([k, v]) => [v, k]));

function englishToMorse(input) {
  return input.toUpperCase().split(' ').map(word => word.split('').map(char => morseCodeDict[char] || char).join(' ')).join(' / ');
}

function morseToEnglish(input) {
  let result = input;
  while (/^[\.\-\/\s]*$/.test(result)) {
    result = result.split(' / ').map(word => word.split(' ').map(symbol => reverseMorseCodeDict[symbol] || '').join('')).join(' ');
  }
  return result;
}

function translate(input) {
  const isMorse = /^[\.\-\/\s]*$/.test(input);
  return isMorse ? morseToEnglish(input) : englishToMorse(input);
}

function multipleEncode(input, times) {
  let result = input;
  for (let i = 0; i < times; i++) {
    result = englishToMorse(result);
  }
  return result;
}

function multipleDecode(input, times) {
  let result = input;
  for (let i = 0; i < times; i++) {
    result = morseToEnglish(result);
  }
  return result;
}

document.getElementById('translateButton').addEventListener('click', () => {
  try {
    const input = document.getElementById('inputBox').value;
    const times = Number(document.getElementById('numberInput').value);
    if (isNaN(times)) {
      throw new Error("Invalid number of translations");
    }
    let result = input;
    let outputBox = document.getElementById('outputBox');
    outputBox.value = '';
    let isMorse = /^[\.\-\/\s]*$/.test(input);
    if (isMorse) {
      result = multipleDecode(result, times);
    } else {
      result = multipleEncode(result, times);
    }
    outputBox.value = result;
  } catch (error) {
    outputBox.value = `Error: ${error.message}`;
  }
});
