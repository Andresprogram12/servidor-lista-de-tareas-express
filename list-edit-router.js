const express = require('express');
const router = express.Router();

// Lista de tareas (ejemplo)
let tasks = [
  { id: 1, description: 'Tarea 1', completed: true },
  { id: 2, description: 'Tarea 2', completed: false },
  { id: 3, description: 'Tarea 3', completed: true },
];

// Crear una tarea
router.post('/create', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json({ message: 'Tarea creada correctamente' });
});

// Eliminar una tarea
router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((task) => task.id != taskId);
  res.json({ message: 'Tarea eliminada correctamente' });
});

// Actualizar una tarea
router.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks = tasks.map((task) => {
    if (task.id == taskId) {
      return { ...task, ...updatedTask };
    }
    return task;
  });
  res.json({ message: 'Tarea actualizada correctamente' });
});

module.exports = router;
