import { describe, it, expect } from "vitest";
import { add } from "./utils";

describe("add function", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("works with negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
