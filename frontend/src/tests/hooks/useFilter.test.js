import { renderHook } from "@testing-library/react-hooks";
import { useFilter } from "../../hooks/useFilter";

const products = [
  { name: "IPhone", price: 500, rating: 5 },
  { name: "Airpods", price: 400, rating: 5 },
  { name: "MacBook", price: 1000, rating: 4 },
];

describe("filters data", () => {
  it("with no filters applied", () => {
    const filters = { name: "", range: { price: 0 }, rating: 0 };
    const { result } = renderHook(() => useFilter(products, filters));
    expect(result.current).toEqual(products);
  });

  it("with multiple filters combined", () => {
    const filters = { range: { price: 500 }, rating: 5 };
    const filteredProducts = [{ name: "IPhone", price: 500, rating: 5 }];
    const { result } = renderHook(() => useFilter(products, filters));
    expect(result.current).toEqual(filteredProducts);
  });

  describe("by the value with a typeof", () => {
    it("string", () => {
      const filters = { name: "Airpods" };
      const filteredProducts = [{ name: "Airpods", price: 400, rating: 5 }];
      const { result } = renderHook(() => useFilter(products, filters));
      expect(result.current).toEqual(filteredProducts);
    });

    it("number", () => {
      const filters = { rating: 5 };
      const filteredProducts = [
        { name: "IPhone", price: 500, rating: 5 },
        { name: "Airpods", price: 400, rating: 5 },
      ];
      const { result } = renderHook(() => useFilter(products, filters));
      expect(result.current).toEqual(filteredProducts);
    });

    it("object and a property of range", () => {
      const filters = { range: { price: 500 } };
      const filteredProducts = [
        { name: "IPhone", price: 500, rating: 5 },
        { name: "MacBook", price: 1000, rating: 4 },
      ];
      const { result } = renderHook(() => useFilter(products, filters));
      expect(result.current).toEqual(filteredProducts);
    });
  });
});
