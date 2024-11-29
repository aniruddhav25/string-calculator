export function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  
  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(.+)\n/);
    if (match) {
      delimiter = new RegExp(match[1]);
      numbers = numbers.slice(match[0].length);
    }
  }

  const numArray = numbers.split(delimiter).map(Number);
  return numArray.reduce((sum, num) => sum + num, 0);
}
