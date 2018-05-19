const mongoose = require('mongoose');
const config = require('../config');
mongoose.set('debug', true);
mongoose.connect(config.dbHost);


mongoose.Promise = Promise;

module.exports.Todo = require('./todo');