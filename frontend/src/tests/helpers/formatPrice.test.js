import { formatPrice } from "../../helpers/formatPrice";

const price = 150.6512;
const formattedPrice = formatPrice(price);

it("formats the price", () => {
  expect(formattedPrice).toBe(150.65);
});
