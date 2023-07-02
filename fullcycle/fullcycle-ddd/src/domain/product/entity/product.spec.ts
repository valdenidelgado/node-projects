import Product from "./product";

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product("", "Product 1", 100))
    .toThrowError("Id is required")
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product("1", "", 100))
    .toThrowError("Name is required")
  });

  it('should throw error when price is than zero', () => {
    expect(() => new Product("1", "Product 1", -1))
    .toThrowError("Price must be greater than zero")
  });

  it('should change name', () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it('should change price when price is greater than zero', () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});