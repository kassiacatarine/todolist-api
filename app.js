const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const usersRouter = require('./src/routes/users');
const tasksRouter = require('./src/routes/tasks');

const Mongo = require('./src/database/mongo');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').load();
}

const mongo = new Mongo();
mongo.connection(process.env.DB_IN_MEMORY === 'true');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

module.exports = app;
