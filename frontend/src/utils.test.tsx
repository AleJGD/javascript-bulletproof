import { describe, it, expect, beforeEach, vi } from "vitest";
import { add, fetchData } from "./utils";

describe("utils functions unit tests", () => {
  describe("add function", () => {
    it("adds two numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    it("works with negative numbers", () => {
      expect(add(-2, -3)).toBe(-5);
    });
  });

  describe("fetchData function", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("should return user data when fetching from /user", async () => {
      const userData = { id: 1, name: "Test User" };

      global.fetch = vi.fn((url) => {
        if (url === "https://api.example.com/user") {
          return Promise.resolve({
            ok: true,
            json: async () => userData,
          });
        }
        return Promise.reject(new Error("Unexpected URL"));
      }) as unknown as typeof fetch;

      const data = await fetchData("https://api.example.com/user");
      expect(data).toEqual(userData);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/user");
    });

    it("should return post data when fetching from /post", async () => {
      const postData = { id: 42, title: "Vitest Testing" };

      global.fetch = vi.fn((url) => {
        if (url === "https://api.example.com/post") {
          return Promise.resolve({
            ok: true,
            json: async () => postData,
          });
        }
        return Promise.reject(new Error("Unexpected URL"));
      }) as unknown as typeof fetch;

      const data = await fetchData("https://api.example.com/post");
      expect(data).toEqual(postData);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/post");
    });

    it("should throw an error when API call fails", async () => {
      global.fetch = vi.fn((url) => {
        if (url === "https://api.example.com/fail") {
          return Promise.resolve({
            ok: false,
            json: async () => ({}),
          });
        }
        return Promise.reject(new Error("Unexpected URL"));
      }) as unknown as typeof fetch;

      await expect(fetchData("https://api.example.com/fail")).rejects.toThrow(
        "Failed to fetch data from https://api.example.com/fail"
      );
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/fail");
    });
  });
});
