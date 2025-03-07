const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	id: String,
	name: String,
	description: String,
	choices: [
		{
			id: String,
			label: String,
			icon: String,
		},
	],
});

module.exports = mongoose.model("Card", cardSchema);
