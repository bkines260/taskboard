const request = require('supertest');
const app = require('./app');

describe('/api/tasks', () => {
  test('GET / returns an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST / creates a task', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Acheter du pain' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Acheter du pain', done: false });
    expect(res.body.id).toBeDefined();
  });
});
