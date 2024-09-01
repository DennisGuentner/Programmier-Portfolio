var express = require('express');
var router = express.Router();

/* Controller */
let borrowController = require('../controllers/borrowController');

router.route('/')
  /* Get all Borrow */
  .get(function(req, res, next) {
    let response = borrowController.getAllBorrow();

    res.send(response);
  })

  /* Create Borrow */
  .post(function(req, res, next) {
    let response = borrowController.createBorrow(req.body);

    res.send(response);
});

router.route('/:id')  
  /* Get User by ID */
  .get(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = borrowController.getBorrowById(id); 

    res.send(response);
  })

  /* Update User */
  .put(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = borrowController.updateBorrow(id, req.body); 

    res.send(response);
  })

  /* Delete User */
  .delete(function(req, res, next) {
    let id = parseInt(req.params.id);
    let response = borrowController.deleteBorrow(id); 

    res.json(response);
});

/* Exports */
module.exports = router;