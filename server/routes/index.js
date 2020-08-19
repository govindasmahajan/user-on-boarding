const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Application Backend'
	});
});

/*Check Health of the server*/
router.get('/health', function (req, res, next) {
	res.render('health', {
		title: 'Application Backend'
	});
});

module.exports = router;