const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	id: Number,
	cardId: {
		type: String,
		required: true,
		index: true,
	},
	name: String,
	correctAnswers: [
		{
			type: String,
			enum: [
				// Classic Card Answers
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
				"BVB", // Changed from BO4
				"ITALIAN_GOLDEN_BOOT",
				"BRA",
				"DUTCH_DIV",
				"ANCELOTTI",
				"PLAYED_WITH_RIBERY",

				// Modern Card Answers
				"PSG",
				"ESP",
				"WORLD_CUP_WINNER",
				"FERGUSON",
				"PSV",
				"NLD_RMA",
				"BRAZILIAN_TOP_DIV",
				"MUN",
				"CL_GOLDEN_BOOT",
				"CR7",
				"LEI",
				"ENGLISH_GOLDEN_BOOT",
				"ARS",
				"SVN",

				// Carrick Card Answers
				"BAY",
				"CL_GOLDEN_BOOT_93",
				"EUROPA_WINNER_2010",
				"MEX",
				"TOT",
				"POR",
				"NOR",
				"CL_WINNER_93",
				"AJA",
				"NLD_BAY",
				"PLAYED_WITH_R9",
				"MANAGED_BY_EMERY",
				"CIV",
				"DUTCH_DIV_57",
				"DOR",
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
