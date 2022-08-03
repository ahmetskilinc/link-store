const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	user_provider_id: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	links: {
		type: Array,
		default: [],
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
