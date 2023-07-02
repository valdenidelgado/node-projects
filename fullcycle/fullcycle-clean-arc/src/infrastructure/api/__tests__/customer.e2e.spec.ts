import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
  
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it('should create a customer', async () => {
    const customer = {
      name: 'John',
      address: {
        street: 'street 1',
        number: 1,
        city: 'city 1',
        zip: 'zip 1'
      }
    };

    const response = await request(app)
      .post('/customer')
      .send(customer);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(customer.name);
    expect(response.body.address.street).toBe(customer.address.street);
    expect(response.body.address.number).toBe(customer.address.number);
    expect(response.body.address.city).toBe(customer.address.city);
    expect(response.body.address.zip).toBe(customer.address.zip);
  });

  it('should not create a customer', async () => {
    const customer = {
      name: 'John',
    };

    const response = await request(app)
      .post('/customer')
      .send(customer);

    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    const customer = {
      name: 'John',
      address: {
        street: 'street 1',
        number: 1,
        city: 'city 1',
        zip: 'zip 1'
      }
    };

    const customer2 = {
      name: 'Jane',
      address: {
        street: 'street 2',
        number: 2,
        city: 'city 2',
        zip: 'zip 2'
      }
    };

    const response = await request(app)
      .post('/customer')
      .send(customer);

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send(customer2);

    expect(response2.status).toBe(200);

    const listResponse = await request(app)
      .get('/customer')
      .send();
      

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customerResponse = listResponse.body.customers[0];
    expect(customerResponse.name).toBe(customer.name);
    expect(customerResponse.address.street).toBe(customer.address.street);
    const customerResponse2 = listResponse.body.customers[1];
    expect(customerResponse2.name).toBe(customer2.name);
    expect(customerResponse2.address.street).toBe(customer2.address.street);

    const listResponseXML = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send();
    
    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(listResponseXML.text).toContain('<customers>');
    expect(listResponseXML.text).toContain('<customer>');
    expect(listResponseXML.text).toContain('<id>');
    expect(listResponseXML.text).toContain('<name>');
    expect(listResponseXML.text).toContain('<address>');
    expect(listResponseXML.text).toContain('<street>');
    expect(listResponseXML.text).toContain('<number>');
    expect(listResponseXML.text).toContain('<city>');
    expect(listResponseXML.text).toContain('<zip>');
    expect(listResponseXML.text).toContain('</customer>');
    expect(listResponseXML.text).toContain('</customers>');
    expect(listResponseXML.text).toContain('</id>');
    expect(listResponseXML.text).toContain('</name>');
    expect(listResponseXML.text).toContain('</address>');
    expect(listResponseXML.text).toContain('</street>');
    expect(listResponseXML.text).toContain('</number>');
    expect(listResponseXML.text).toContain('</city>');
    expect(listResponseXML.text).toContain('</zip>');
  });
});