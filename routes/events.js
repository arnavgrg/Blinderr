var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')

/* GET all events */
router.get('/', eventController.listAllEvents);

/* GET a event by mongo id */
router.get('/:id', eventController.getEventById);

/* DELETE a event by mongo id */
router.delete('/:id', eventController.deleteEventById);

/* POST new event 
	Need to provide value for 
	{
		name:
	}
*/
router.post('/create', eventController.insertNewEvent);

/* POST new user into event
	{
	userId: idToAdd
	}
*/
router.post('/addUser', eventController.addPersonToEventById);

module.exports = router;
