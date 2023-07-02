import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer('123', 'John Doe')
const address = new Address('Main Street', 123, 'New York', '12345');
customer.changeAddress(address);

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
}

describe('Unit Test find customer use case', () => {

  it('should find a customer', async () => {
    const customerRepository = mockRepository();
    const usecase = new FindCustomerUseCase(customerRepository)
  
    const input = {
      id: '123',
    }

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Main Street',
        number: 123,
        city: 'New York',
        zip: '12345',
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error when customer not found', async () => {
    const customerRepository = mockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const usecase = new FindCustomerUseCase(customerRepository)
  
    const input = {
      id: '123',
    }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});