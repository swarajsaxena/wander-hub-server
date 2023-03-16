const { Trip } = require('../models/trip.model');

const { Router } = require('express');

const router = Router();

router.post('/comment/post', async (req, res, next) => {
	try {
		const trip = await Trip.findById(req.body.tripId);
		trip.comments.push({
			user: {
				username: req.body.username,
				userId: req.body.userId,
			},
			comment: req.body.comment,
		});
		trip.save()
			.then(() =>
				res.json({
					success: true,
					comments: trip.comments,
				})
			)
			.catch(err =>
				res.json({
					success: false,
					message: err.message,
				})
			);
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

module.exports = router;
