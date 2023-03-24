const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	trips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "trips",
		},
	],
});

const User = mongoose.model("users", userSchema);
module.exports = { User };
