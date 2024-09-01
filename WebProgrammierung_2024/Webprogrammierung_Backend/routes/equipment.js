var express = require('express');
var router = express.Router();

/* Controller */
let equipmentController = require('../controllers/equipmentController');

router.route('/')
  /* Get all Equipment */
  .get(function(req, res, next) {
    let response = equipmentController.getAllEquipment();

    res.send(response);
  })

  /* Create Equiment */
  .post(function(req, res, next) {
    let response = equipmentController.createEquipment(req.body);

    res.send(response);
  });

router.route('/:id')  
  /* Get Equipment by ID */
  .get(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = equipmentController.getEquipmentById(id); 

    res.send(response);
  })

  /* Update Equipment */
  .put(function(req, res, next) {
    let id = parseInt(req.params.id); 
    let response = equipmentController.updateEquipment(id, req.body); 

    res.send(response);
  })

  /* Delete Equipment */
  .delete(function(req, res, next) {
    let id = parseInt(req.params.id);
    let response = equipmentController.deleteEquipment(id); 

    res.json(response);
  });

/* Exports */
module.exports = router;