const request = require('supertest');
const app = require('../config/app');


describe('JSON Parser Middleware', () => {
  it('should enable cors', async () => {
    app.post('/body', (req, res) => res.send(req.body));
    await request(app).post('/body').send({ name: 'any_name' }).expect({ name: 'any_name' });
  });
});