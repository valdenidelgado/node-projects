import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address('street', 1, 'city', 'zip'));

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'street updated',
    number: 2,
    city: 'city updated',
    zip: 'zip updated',
  },
}

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn()
  }
}

describe('Unit test for customer update use case', () => {

  it('should update customer', async () => {
    const repository = mockRepository();
    const useCase = new UpdateCustomerUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});