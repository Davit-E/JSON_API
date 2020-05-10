var db = require('../models');

exports.getTodos = function(req, res){
  db.Todo.find()
    .then(function (todos) {
      res.send(todos);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.createTodo = function(req, res){
  db.Todo.create(req.body)
    .then(function (newTodo) {
      res.status(201).json(newTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.getTodo = function(req, res){
  db.Todo.findById(req.params.todoId)
    .then(function (foundTodo) {
      res.json(foundTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.updateTodo = function(req, res){
  db.Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
    .then(function (updatedTodo) {
      res.json(updatedTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.deleteTodo = function(req, res){
  db.Todo.findByIdAndRemove(req.params.todoId)
    .then(function (deletedTodo) {
      res.json(deletedTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};



module.exports = exports;