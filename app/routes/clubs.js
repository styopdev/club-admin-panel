var express = require('express');
var router = express.Router();
var ClubModel = require("../models/club");

/* GET home page. */
router.get('/form', function(req, res, next) {
	if (!req.session.user_id) {
		return res.redirect("/users/login");
	}
	return res.render("clubform");
});

router.post('/form', function(req, res, next) {
	if (!req.session.user_id) {
		return res.redirect("/users/login");
	}
	var club = new ClubModel();
	console.log(req.body);
	club.title = req.body.title;
	club.video = req.body.video;
	club.cover = req.body.cover;
	club.save(function(err) {
		if (err) {
			return next(err);
		} else {
			return res.status(201).send({"message" : "Successfully saved"});
		}
	});
});

router.get('/list', function(req, res, next) {
	
	ClubModel.find({}, function(err, clubs) {
		if (err) {
			return next(err);
		} else {
			return res.status(200).json(clubs);
		}
	})
});

module.exports = router;
