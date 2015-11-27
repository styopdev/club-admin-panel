var express = require('express');
var router = express.Router();
var UserModel = require("../models/user");

/* GET users listing. */
router.post('/login', function(req, res, next) {
	UserModel.findOne({"username" : req.body.username, "password" : req.body.password}, function(err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			return res.status(403).send({"message" :"Wrong Username or Password"});
		} else {
			req.session.user_id = user.id;
			return res.redirect("/clubs/form");
		}
	});
});

router.get('/login', function(req, res, next) {
  	return res.render('login');
});
module.exports = router;
