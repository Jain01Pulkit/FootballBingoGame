const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	id: Number,
	name: String,
	correctAnswers: [
		{
			type: String,
			enum: [
				"EUROS_WINNER",
				"COPA_AMERICA_WINNER",
				"NLD",
				"GER",
				"INT",
				"WHU",
				"BRA_MIL",
				"JUV",
				"ITA",
				"MIL",
				"BO4",
				"ITALIAN_GOLDEN_BOOT",
				"BRA",
				"DUTCH_DIV",
				"ANCELOTTI",
				"PLAYED_WITH_RIBERY",
			],
		},
	],
	image: String,
	difficulty: String,
	nationality: String,
	currentTeam: String,
	position: String,
	age: Number,
	previousTeams: [String],
	trophies: [String],
	isUsed: {
		type: Boolean,
		default: false,
	},
	lastUsed: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model("Player", playerSchema);
