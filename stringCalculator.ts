
export function add(numbers: string, maxNumber: number = 1000): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;

  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(.+)\n/);
    if (match) {
      delimiter = new RegExp(match[1]);
      numbers = numbers.slice(match[0].length);
    }
  }

  const numArray = numbers.split(delimiter);

  // Validate inputs
  const invalidInputs = numArray.filter((n) => isNaN(Number(n)) && n.trim() !== "");
  if (invalidInputs.length > 0) {
    throw new Error(`Invalid input detected: ${invalidInputs.join(", ")}`);
  };

  const parsedNumbers = numArray.map(Number);

  const negatives = parsedNumbers.filter((num) => num < 0);

  if (negatives.length)
    throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);

  const filteredNumbers = parsedNumbers.filter((num) => num <= maxNumber);


  return filteredNumbers.reduce((sum, num) => sum + num, 0);
}
