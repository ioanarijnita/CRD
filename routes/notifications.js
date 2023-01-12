const express = require('express');

const router = express.Router();

const {sendnotification} = require("../controllers/send-notification");

const {updatenotification} = require("../controllers/update-notification");

const {getnotifications} = require("../controllers/get-notifications");

router.post('/sendnotification' , sendnotification);
router.put('/updatenotification' , updatenotification); 
router.get('/getnotifications' , getnotifications);

module.exports = router;
