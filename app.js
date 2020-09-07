const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PersonController = require('./controllers/PersonController');
const EventController = require('./controllers/EventController');

app.get('/person/list',				PersonController.list);
app.post('/person/insert',			PersonController.insert);
app.get('/person/find/:id',			PersonController.find);
app.delete('/person/delete/:id',	PersonController.delete);
app.put('/person/update/:id',		PersonController.update);

app.get('/event/list',				EventController.list);
app.post('/event/insert',			EventController.insert);
app.get('/event/find/:id',			EventController.find);
app.delete('/event/delete/:id',		EventController.delete);
app.put('/event/update/:id',		EventController.update);

// app.get('/tag/list',				TagController.list);
// app.post('/tag/insert',			TagController.insert);
// app.get('/tag/find/:id',			TagController.find);
// app.delete('/tag/delete/:id',	TagController.delete);
// app.put('/tag/update/:id',		TagController.update);

app.listen(3333);