var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET all users */
router.get('/', userController.listAllUsers);

/* GET a user by mongo id */
router.get('/:id', userController.getUserById);

/* DELETE a user by mongo id */
router.delete('/:id/delete', userController.deleteUserById);

/* UPDATE a user by mongo id */
router.put('/:id/update', userController.updateUserById);

/* POST new user */
router.post('/create', userController.insertNewUser);



module.exports = router;
