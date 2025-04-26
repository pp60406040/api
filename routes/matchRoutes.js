const express = require('express');
const router = express.Router();
const MatchsController = require('../controllers/matchController');

router.post('/createMatch',MatchsController.createMatch);
router.get('/getAllMatch',MatchsController.getAllMatchs);
router.get('/getMatchById/:id',MatchsController.getMatchById);
router.get('/getAllMatchsByPage',MatchsController.getAllMatchsByPage);
router.put('/updateMatch/:id',MatchsController.updateMatch);
router.delete('/deleteMatch/:id',MatchsController.deleteMatch);

module.exports = router;
