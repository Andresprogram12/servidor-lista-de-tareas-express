const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const express = require('express');

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, description: 'Tarea 1', completed: false },
  { id: 2, description: 'Tarea 2', completed: true },
  // Agrega más tareas si es necesario
];
let nextTaskId = tasks.length + 1;

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Obtener una sola tarea
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'La descripción de la tarea es requerida' });
  }

  const newTask = {
    id: nextTaskId++,
    description,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const { description, completed } = req.body;

  if (description) {
    task.description = description;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json(deletedTask);
});

// Obtener tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(t => t.completed);

  res.json(completedTasks);
});

// Obtener tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(t => !t.completed);

  res.json(incompleteTasks);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
