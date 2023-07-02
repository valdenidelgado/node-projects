const request = require('supertest');
const app = require('./app');


describe('App Setup', () => {
  it('should disable x-powered-by header', async () => {
    app.get('/', (req, res) => res.send());
    const res = await request(app).get('/')
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});