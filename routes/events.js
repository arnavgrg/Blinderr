var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')

/* GET all events */
router.get('/', eventController.listAllEvents);

/* GET a event by mongo id */
router.get('/:id', eventController.getEventById);

/* DELETE a event by mongo id */
router.delete('/:id/', eventController.deleteEventById);

/* POST new event */
router.post('/create', eventController.insertNewEvent);



module.exports = router;
