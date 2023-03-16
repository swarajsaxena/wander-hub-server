const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	cityToVisit: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	days: [
		{
			place: {
				type: String,
				required: true,
			},
			attractions: [
				{
					type: String,
					required: true,
				},
			],
			photos: [{ type: String, required: true }],
			// recomendations: {},
			description: {
				type: String,
				required: true,
			},
		},
	],
	comments: [
		{
			user: {
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'users',
					required: true,
				},
				username: {
					type: String,
					required: true,
				},
			},
			comment: {
				type: String,
				required: true,
			},
			postedDate: {
				type: Date,
				default: Date.now,
			},
		},
	],
	bannerImage: String,
	likes: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
				required: true,
			},
		},
	],
	createdBy: {
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = { Trip };
