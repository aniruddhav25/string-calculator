export function add(numbers: string, maxNumber: number = 1000): number {
  // Default maxNumber set to 1000 if not received when the function is called.

  if (numbers === "") return 0;
  // If the input string is empty, return 0.

  let delimiters = /,|\n/; // Default delimiters are a comma (,) or a newline (\n).
  const customDelimiterPattern = /^\/\/(\[.*?\])+\n/; // Pattern to match multiple custom delimiters (in square brackets).
  const singleDelimiterPattern = /^\/\/(.+)\n/; // Pattern to match a single custom delimiter (without square brackets).

  // Check for multiple custom delimiters in the input string
  if (customDelimiterPattern.test(numbers)) {
    const match = numbers.match(customDelimiterPattern);

    if (match) {
      delimiters = extractMultipleDelimiters(match[0]);
      numbers = numbers.slice(match[0].length);
    }
  } else if (singleDelimiterPattern.test(numbers)) {
    // If the string matches the pattern for a single custom delimiter.
    const match = numbers.match(singleDelimiterPattern);

    if (match) {
      delimiters = new RegExp(escapeRegex(match[1])); // Escape and use the single custom delimiter in a regular expression.
      numbers = numbers.slice(match[0].length); // Remove the custom delimiter part from the input string.
    }
  }

  // Split the input string by the specified delimiters to get an array of number strings.
  const numArray = numbers.split(delimiters);

  // Validate inputs by checking if there are non-numeric values in the array.
  throwErrorForInvalidInputs(numArray)

  // Convert the array of number strings into an array of actual numbers.
  const parsedNumbers = numArray.map(Number);
  
  throwErrorForNegativeNumber(parsedNumbers);
   
  // Filter out the numbers which has value greter than max specified number
  const filteredNumbers = parsedNumbers.filter((num) => num <= maxNumber);

  return filteredNumbers.reduce((sum, num) => sum + num, 0);
}

//Adds a backlash for escaping the matched regex pattern to prevent unusual behaviour
function escapeRegex(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function extractMultipleDelimiters(input: string): RegExp {
  const rawDelimiters =
    input.match(/\[.*?\]/g)?.map((delim) => delim.slice(1, -1)) || [];
  const delimiters = new RegExp(rawDelimiters.map(escapeRegex).join("|"));

  return delimiters;
}

function throwErrorForInvalidInputs(arr: string[]): void {
  const invalidInputs = arr.filter((n) => isNaN(Number(n)) && n.trim() !== "");
  
  if(invalidInputs.length) throw new Error(`Invalid input detected: ${invalidInputs.join(", ")}`);
}

function throwErrorForNegativeNumber(arr:number[]): void {

  const negatives = arr.filter((num) => num < 0);

  if (negatives.length)
    throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);

}