var mongoose = require('mongoose');
// mongoose.set('debug', true);
var dbLocal = 'mongodb://localhost/json_todo';
var dbUrl = 'mongodb+srv://David:pass123@cluster-ow1i4.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');