const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PersonController = require('./controllers/PersonController');

app.get('/person/list', PersonController.list);
app.post('/person/insert', PersonController.insert);
app.get('/person/find/:id', PersonController.find);
app.delete('/person/delete/:id', PersonController.delete);
app.put('/person/update/:id', PersonController.update);

app.listen(3333);