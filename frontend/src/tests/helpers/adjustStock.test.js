import { adjustStock } from "../../helpers/adjustStock";

const dispatch = jest.fn();

const products = [
  { _id: 1, name: "Airpods", countInStock: 3 },
  { _id: 2, name: "MacBook", countInStock: 5 },
];

const cartItems = [
  { _id: 1, name: "Airpods", countInStock: 3, quantity: 1 },
  { _id: 2, name: "MacBook", countInStock: 5, quantity: 2 },
];

const adjustedStock = [
  { _id: 1, name: "Airpods", countInStock: 2 },
  { _id: 2, name: "MacBook", countInStock: 3 },
];

it("adjusts the stock", () => {
  adjustStock(dispatch, cartItems, products);
  expect(products).toEqual(adjustedStock);
});
