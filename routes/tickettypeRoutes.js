const express = require('express');
const router = express.Router();
const TickettypesController = require('../controllers/tickettypeController');

router.post('/createTickettype',TickettypesController.createTickettype);
router.get('/getAllTickettype',TickettypesController.getAllTickettypes);
router.get('/getAllTickettypesByPage',TickettypesController.getAllTickettypesByPage);
router.put('/updateTickettype/:id',TickettypesController.updateTickettype);
router.delete('/deleteTickettype/:id',TickettypesController.deleteTickettype);

module.exports = router;
