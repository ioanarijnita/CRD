const express = require('express');

const router = express.Router();

const {register} = require("../controllers/register");

const {login} = require("../controllers/login");

const {updatepersonalinfo} = require("../controllers/update-personal-info");
const {updatebloodtype} = require("../controllers/update-blood-type");

router.post('/register' , register); //POST request to register the user
router.post('/login' , login); // POST request to login the user
router.put('/updatepersonalinfo' , updatepersonalinfo);
router.put('/updatebloodtype' , updatebloodtype);


module.exports = router;
