const fns = require("./sandbox");
const fetch = require("node-fetch");

// Mocking the call instead

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => {
      Promise.resolve({
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description:
          "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        category: "men clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      });
    },
  });
});

it("should return a specific product mocked", async () => {
  const product = await fns.fetchProducts("3");
  expect(product.title).toBe("Mens Cotton Jacket");
});

describe("Testing Order Total", () => {
  it("Should calculate correct amount", () => {
    expect(
      fns.orderTotal(
        [
          { id: 3, price: 55.99, quantity: 1 },
          { id: 6, price: 20.99, quantity: 2 },
        ],
        0
      )
    ).toBe(97.97);
  }),
    it("Should calculate correct amount without quantity or shipping", () => {
      expect(
        fns.orderTotal([
          { id: 3, price: 2.99 },
          { id: 6, price: 20.99 },
        ])
      ).toBe(23.98);
    }),
    it("Should calculate correct amount with shipping taken off over £50", () => {
      expect(
        fns.orderTotal(
          [
            { id: 3, price: 10.99, quantity: 1 },
            { id: 6, price: 20.99, quantity: 2 },
          ],
          2.99
        )
      ).toBe(52.97);
    });
  it("Should calculate correct amount with shipping NAN", () => {
    expect(
      fns.orderTotal(
        [
          { id: 3, price: 10.99, quantity: 1 },
          { id: 6, price: 20.99, quantity: 1 },
        ],
        "not a number"
      )
    ).toBe(31.98);
  });
});
