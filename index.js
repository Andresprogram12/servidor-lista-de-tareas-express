const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();

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
