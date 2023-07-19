const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'usuario1', password: 'password1' },
  { id: 2, username: 'usuario2', password: 'password2' },
  // Agrega más usuarios si es necesario
];

// Ruta de autenticación /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en el array de usuarios
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Generar el token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Ruta protegida
app.get('/ruta-protegida', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Aquí puedes realizar las acciones necesarias para la ruta protegida
    // Por ejemplo, buscar el usuario en la base de datos y devolver los datos relevantes

    res.json({ message: 'Ruta protegida accedida correctamente', userId });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Implementar routers
app.use('/api/list-view', listViewRouter);
app.use('/api/list-edit', listEditRouter);

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
