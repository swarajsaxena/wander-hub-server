const { Trip } = require('../models/trip.model');

const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const entries = await Trip.find();
		res.json(entries);
	} catch (error) {
		next(error);
	}
});

router.get('/getOne', async (req, res, next) => {
	try {
		const trip = await Trip.findById(req.headers.id);
		console.log(req.headers.id);
		res.json({ success: true, trip });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

router.post('/newTrip', async (req, res, next) => {
	const newTrip = new Trip(req.body);
	await newTrip
		.save()
		.then(savedDoc => {
			res.json({ success: true, newTrip: savedDoc });
		})
		.catch(err => {
			res.json({ success: false, err: err.message });
		});
});

module.exports = router;
