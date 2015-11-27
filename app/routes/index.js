var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.session && req.session.user_id) {
		return res.redirect("/clubs/form");
	} else {
		return res.redirect("/users/login");
	}
});


module.exports = router;
