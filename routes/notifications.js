const express = require('express');

const router = express.Router();

const {sendnotification} = require("../controllers/send-notification");

const {updatenotification} = require("../controllers/update-notification");

const {getnotifications} = require("../controllers/get-notifications");
const {updatenotificationlocation} = require("../controllers/update-notification-location");


router.post('/sendnotification' , sendnotification);
router.put('/updatenotification' , updatenotification); 
router.get('/getnotifications' , getnotifications);
router.get('/updatenotificationlocation' , updatenotificationlocation);


module.exports = router;
