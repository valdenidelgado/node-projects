import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'John Doe',
  address: {
    street: 'Main Street',
    number: 123,
    city: 'New York',
    zip: '12345',
  }
}

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      }
    });
  });


  it('should throw an error when name is missing', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(useCase.execute(input)).rejects.toThrowError('Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(useCase.execute(input)).rejects.toThrowError('Street is required');
  });
});