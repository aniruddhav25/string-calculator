export function add(numbers: string, maxNumber: number = 1000): number { // Default maxNumber set to 1000 if not received when the function is called.
  if (numbers === "") return 0;

  let delimiters = /,|\n/; // Default delimiters
  const customDelimiterPattern = /^\/\/(\[.*?\])+\n/; // Multi-character delimiters
  const singleDelimiterPattern = /^\/\/(.+)\n/; // Single-character delimiters

  // Check for custom delimiters
  if (customDelimiterPattern.test(numbers)) {
    const match = numbers.match(customDelimiterPattern);
    if (match) {
      const rawDelimiters = match[0].match(/\[.*?\]/g)?.map((delim) => delim.slice(1,-1)) || [];
      delimiters = new RegExp(rawDelimiters.map(escapeRegex).join("|"));
      numbers = numbers.slice(match[0].length);
    }
  } else if (singleDelimiterPattern.test(numbers)) {
    const match = numbers.match(singleDelimiterPattern);
    if (match) {
      delimiters = new RegExp(escapeRegex(match[1])); 
      numbers = numbers.slice(match[0].length); 
    }
  }

  const numArray = numbers.split(delimiters);

  // Validate inputs
  const invalidInputs = numArray.filter(
    (n) => isNaN(Number(n)) && n.trim() !== ""
  );
  if (invalidInputs.length > 0) {
    throw new Error(`Invalid input detected: ${invalidInputs.join(", ")}`);
  }

  const parsedNumbers = numArray.map(Number);

  const negatives = parsedNumbers.filter((num) => num < 0);

  if (negatives.length)
    throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);

  const filteredNumbers = parsedNumbers.filter((num) => num <= maxNumber);

  return filteredNumbers.reduce((sum, num) => sum + num, 0);
}

//Adds a backlash for escaping the matched regex pattern to prevent unusual behaviour
function escapeRegex(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
