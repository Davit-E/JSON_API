var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todoRouts = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
  res.sendFile('index.html');
});
app.use('/api/todos', todoRouts);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is up at... ' + PORT);
});