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

/* PATCH a match to user's match list (1) */
router.post('/:id/matches', userController.addMatchById);

/* POST new user */
router.post('/create', userController.insertNewUser);



module.exports = router;
