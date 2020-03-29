var express = require('express');
var router = express.Router();
const roomController = require('../controllers/roomController')

/* GET all events */
//GET /rooms/5e7fdbbf1e07e00b481ba5d3 <-userID
router.get('/:userToCheck', roomController.ifUserInRoom);

module.exports = router;