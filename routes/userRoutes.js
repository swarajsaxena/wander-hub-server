const { Router } = require('express');
const { Trip } = require('../models/trip.model');
const { User } = require('../models/user.model');

const router = Router();

router.post('/user/:username', async (req, res, next) => {
	const { username } = req.params;

	try {
		const entries = await Trip.find();
		const user = await User.findOne({ username });
		const filteredEntries = entries.filter(
			entry => entry.createdBy.username === username
		);
		res.json({ success: true, trips: filteredEntries, user });
	} catch (error) {
		res.json({ success: false, err: error.message });
	}
});

module.exports = router;
