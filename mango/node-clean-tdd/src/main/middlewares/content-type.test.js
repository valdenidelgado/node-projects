const request = require('supertest');


describe('Content-type middleware', () => {
  let app
  beforeEach(() => {
    jest.resetModules();
    app = require('../config/app');
  });
  it('should return json content-type as default', async () => {
    app.get('/content-type', (req, res) => res.send(''));
    await request(app).get('/content-type').expect('content-type', /json/);
  });

  it('should return json content-type as default', async () => {
    app.get('/content-type-xml', (req, res) => {
      res.type('xml');
      res.send('')
  });
    await request(app).get('/content-type-xml').expect('content-type', /xml/);
  });

});