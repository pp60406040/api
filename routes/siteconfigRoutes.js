const express = require('express');
const router = express.Router();
const SiteconfigsController = require('../controllers/siteconfigController');

router.post('/createSiteconfig', SiteconfigsController.createSiteconfig);
router.get('/getSiteconfig', SiteconfigsController.getAllSiteconfigs);
router.put('/updateSiteconfig/:id', SiteconfigsController.updateSiteconfig);
router.delete('/deleteSiteconfig/:id', SiteconfigsController.deleteSiteconfig);

module.exports = router;