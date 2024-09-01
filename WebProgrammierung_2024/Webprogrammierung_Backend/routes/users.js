var express = require('express');
var router = express.Router();

/* Controller */
let userController = require('../controllers/userController');

router.route('/')
  /* Get all Users */
  .get(function(req, res, next) {
    let response = userController.getAllUsers();

    res.send(response);
  })

  /* Create User */
  .post(function(req, res, next) {
    let response = userController.createUser(req.body);

    res.send(response);
});

router.route('/:id')  
  /* Get User by ID */
  .get(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = userController.getUserById(id); 

    res.send(response);
  })

  /* Update User */
  .put(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = userController.updateUser(id, req.body); 

    res.send(response);
  })

  /* Delete User */
  .delete(function(req, res, next) {
    let id = parseInt(req.params.id);
    let response = userController.deleteUser(id); 

    res.json(response);
});

/* Exports */
module.exports = router;