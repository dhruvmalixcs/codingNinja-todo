const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const {List} = require("./models/list.model");
const {Task} = require("./models/task.model");


// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

// MongoDB connection
mongoose.connect("mongodb+srv://dhruv1212malik:G09CEsCHUM2tIU9E@cluster0.bch6wa5.mongodb.net/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// CORS configuration (redundant with the use of 'cors' middleware)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
const taskRouter = require('./routes/task.routes');
const listRouter = require('./routes/list.routes');

app.use('/', taskRouter);
app.use('/', listRouter);
app.get('/', (req, res) => {
  res.send('Test endpoint working');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
