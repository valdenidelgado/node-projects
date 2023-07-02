import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer('', 'John Doe')).toThrowError('Id is required');
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer('1', '')).toThrowError('Name is required');
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer('123', 'John Doe');
    // Act
    customer.changeName('Jane Doe');
    // Assert
    expect(customer.name).toBe('Jane Doe');
  });

  it("should activate customer", () => {
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Rua dois', 2, '12345-893', 'Sao Paulo');
    customer.address = address;
    customer.activate();
    expect(customer.isActive).toBeTruthy();
  });

  it("should deactivate customer", () => {
    const customer = new Customer('1', 'John Doe');

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should throw error when address is not set", () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.activate()).toThrowError('Address is required');
  });

  it("should add reward points", () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});