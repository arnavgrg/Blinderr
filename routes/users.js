var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET all users */
router.get('/', userController.listAllUsers);

/* GET a user by mongo id */
router.get('/:id', userController.getUserById);

/* DELETE a user by mongo id */
router.delete('/:id', userController.deleteUserById);

/* PUT a user by mongo id */
router.put('/:id', userController.updateUserById);

/* POST a match to user's match list (1) 
	to add, put in body 
	{"matches":"user_id"}
	don't really need anymore*/
router.post('/:id/matches', userController.addMatchById);

/* POST a like to user's like list (1), if it is mutual it will get added to matches 
	put in body
	{"likes":"user_id"}
*/
router.post('/:id/likes', userController.addLikeById);

/* POST new user 
	you need to submit in json values for 
	{
		name:
		email:
		height:
		age:
		sexuality:
		gender:
		bio:
	}
*/
router.post('/create', userController.insertNewUser);

/* post a person that you just saw 
	{ 
		seen:
	}
*/
router.post('/:id/seen', userController.addSeenById);

module.exports = router;
