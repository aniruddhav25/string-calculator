import { add } from "../stringCalculator";

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("returns the number itself for a single number", () => {
    expect(add("1")).toBe(1);
  });

  it("returns the sum of two numbers", () => {
    expect(add("1,2")).toBe(3);
  });

  it("handles multiple numbers", () => {
    expect(add("1,2,3,4")).toBe(10);
  });

  it("handles newlines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("supports custom delimiters", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  it("throws an exception for negative numbers", () => {
    expect(() => add("1,-2,3,-4")).toThrow("negative numbers not allowed: -2, -4");
  });

  it("throws an exception for negative numbers", () => {
    expect(() => add("-2")).toThrow("negative numbers not allowed: -2");
  });

});
