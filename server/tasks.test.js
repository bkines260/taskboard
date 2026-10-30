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

  test('POST / without dueDate stores null', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Sans date' });
    expect(res.status).toBe(201);
    expect(res.body.dueDate).toBeNull();
  });

  test('POST / with a valid dueDate stores it', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Rendre le rapport', dueDate: '2026-11-15' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Rendre le rapport', dueDate: '2026-11-15' });
  });

  test('POST / rejects an impossible dueDate', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Date invalide', dueDate: '2026-02-30' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/dueDate/);
  });

  test('POST / rejects a non-string dueDate', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Mauvais type', dueDate: 20261115 });
    expect(res.status).toBe(400);
  });
});
