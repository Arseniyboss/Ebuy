import { renderHook } from "@testing-library/react-hooks";
import { usePagination } from "../../hooks/usePagination";

const page = 0;
const itemsPerPage = 2;

const products = [
  { name: "IPhone" },
  { name: "Airpods" },
  { name: "MacBook" },
  { name: "AppleWatch" },
];
const paginatedProducts = [{ name: "IPhone" }, { name: "Airpods" }];

it("paginates data", () => {
  const { result } = renderHook(() =>
    usePagination(products, page, itemsPerPage)
  );
  expect(result.current[0]).toEqual(paginatedProducts);
});
