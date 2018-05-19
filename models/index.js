const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://admin:1234567@ds023475.mlab.com:23475/todo-db');


mongoose.Promise = Promise;

module.exports.Todo = require('./todo');