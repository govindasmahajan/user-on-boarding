const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlUsers = require('../controllers/cntlUsers');

var Users = new cntlUsers('Process Users');

/* Routes Related to User Actions */
router.post('/add-user', cors(), _.bind(Users.addUser, Users));
router.get('/list-users', cors(), _.bind(Users.getUserList, Users));

module.exports = router;
