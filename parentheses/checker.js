const isMatchingBracket = s => {
  const string = s;
  const stack = [];
  const brackets = {
      '{' : '}',
      '[' : ']',
      '(' : ')'
  }

  const isOpeningBracket = char => {
    return Object.keys(brackets).includes(char);
  }

  const isClosingBracket = char => {
      return Object.values(brackets).includes(char);
  }

  const isMatchingBracket = char => {
      const lastElementInStack = stack[stack.length - 1];
      return brackets[lastElementInStack] === char;
  }
  
  for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];
      if(isOpeningBracket(currentChar)) {
          stack.push(currentChar);
      } else if(isClosingBracket(currentChar) && isMatchingBracket(currentChar)) {
          stack.pop()
      } else if(isClosingBracket(currentChar) && brackets[stack.length - 1] !== currentChar) {
          return false;
      }
  }
  return stack.length === 0
}