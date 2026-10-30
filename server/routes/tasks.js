const express = require('express');
const { isValidDueDate } = require('../validators');

const router = express.Router();

let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, dueDate } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  if (dueDate != null && !isValidDueDate(dueDate)) {
    return res.status(400).json({ error: 'dueDate must be a valid date (YYYY-MM-DD)' });
  }
  const task = { id: nextId++, title, done: false, dueDate: dueDate ?? null };
  tasks.push(task);
  res.status(201).json(task);
});

router.patch('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  const { done } = req.body || {};
  task.done = typeof done === 'boolean' ? done : true;
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
