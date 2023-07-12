const express = require('express');
const router = express.Router();

// Lista de tareas (ejemplo)
const tasks = [
  { id: 1, description: 'Tarea 1', completed: true },
  { id: 2, description: 'Tarea 2', completed: false },
  { id: 3, description: 'Tarea 3', completed: true },
];

// Obtener tareas completas
router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

// Obtener tareas incompletas
router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
