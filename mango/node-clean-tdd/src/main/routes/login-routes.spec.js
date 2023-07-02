const request = require('supertest');
const app = require('../config/app');

describe('Login routes', () => {
  it('should return 200 when valid credentials are provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: '',
        password: ''
      }).expect(200);
  });
});