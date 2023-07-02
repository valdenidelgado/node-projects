import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";


const customer1 = CustomerFactory.createWithAddress('John', new Address('street 1', 1, 'city 1', 'zip 1'));
const customer2 = CustomerFactory.createWithAddress('Jane', new Address('street 2', 2, 'city 2', 'zip 2'));

const mockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    update: jest.fn(),
  }
}

describe('Unit test for listing customer use case', () => {

  it('should list customers', async () => {
    const repository = mockRepository();
    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            zip: customer1.address.zip,
          }
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            zip: customer2.address.zip,
          }
        }
      ]
    });
  });
});