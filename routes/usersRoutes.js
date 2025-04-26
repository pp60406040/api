const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/createUser', usersController.createUser);
router.get('/getAllUsers', usersController.getAllUsers);
router.get('/getAllUsersByPage', usersController.getAllUsersByPage);
router.post('/loginUser', usersController.loginUser);
router.put('/updateUser/:id', usersController.updateUser);
router.put('/updateUserStatus/:id', usersController.updateUserStatus);
router.delete('/deleteUser/:id', usersController.deleteUser);

module.exports = router;