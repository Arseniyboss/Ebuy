import { renderHook } from "@testing-library/react-hooks";
import { useSort } from "../../hooks/useSort";

const products = [{ name: "IPhone" }, { name: "Airpods" }, { name: "MacBook" }];

describe("sorts data", () => {
  it("in ascending order", () => {
    const asc = {
      sorts: { name: "asc" },
      products: [{ name: "Airpods" }, { name: "IPhone" }, { name: "MacBook" }],
    };
    const { result } = renderHook(() => useSort(products, asc.sorts));
    expect(result.current[0]).toEqual(asc.products);
  });

  it("in descending order", () => {
    const desc = {
      sorts: { name: "desc" },
      products: [{ name: "MacBook" }, { name: "IPhone" }, { name: "Airpods" }],
    };
    const { result } = renderHook(() => useSort(products, desc.sorts));
    expect(result.current[0]).toEqual(desc.products);
  });
});
