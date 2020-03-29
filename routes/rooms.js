var express = require('express');
var router = express.Router();
const roomController = require('../controllers/roomController')

/* GET all events */
//GET /rooms/5e7fdbbf1e07e00b481ba5d3 <-userID
router.get('/:userToCheck', roomController.ifUserInRoom);

//Delete a room from p1 standpoint
router.delete('/:id', roomController.deleteRoomById);

//Create a room
router.post('/create', roomController.insertRoom);

module.exports = router;