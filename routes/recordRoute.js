const express = require('express');
const recordController = require('../controllers/recordController');
const createAccountSchema = require('../middlewares/validator')
const router = express.Router();

router.route('/records').post(createAccountSchema, recordController.getRecords);

module.exports = router;


