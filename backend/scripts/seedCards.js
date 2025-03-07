const Card = require("../models/Card");

const cards = [
	{
		id: "classic",
		name: "Classic Football Card",
		description: "Test your knowledge of football history and achievements",
		choices: [
			{ id: "EUROS_WINNER", label: "EUROS WINNER", icon: "🏆" },
			{
				id: "COPA_AMERICA_WINNER",
				label: "COPA AMERICA WINNER\nSINCE 1960",
				icon: "🏆",
			},
			{ id: "NLD", label: "NLD", icon: "🇳🇱" },
			{ id: "GER", label: "GER", icon: "🇩🇪" },
			{ id: "INT", label: "INT", icon: "⚫🔵" },
			{ id: "WHU", label: "WHU", icon: "⚒️" },
			{ id: "BRA_MIL", label: "BRA x MIL", icon: "🇧🇷" },
			{ id: "JUV", label: "JUV", icon: "⚫⚪" },
			{ id: "ITA", label: "ITA", icon: "🇮🇹" },
			{ id: "MIL", label: "MIL", icon: "🔴⚫" },
			{ id: "BVB", label: "BVB", icon: "⚫🔴" },
			{
				id: "ITALIAN_GOLDEN_BOOT",
				label: "ITALIAN TOP DIV GOLDEN\nBOOT WINNER",
				icon: "👟",
			},
			{ id: "BRA", label: "BRA", icon: "🇧🇷" },
			{
				id: "DUTCH_DIV",
				label: "PLAYED IN DUTCH TOP\nDIV SINCE 1956/57",
				icon: "🇳🇱",
			},
			{ id: "ANCELOTTI", label: "MANAGED BY\nANCELOTTI", icon: "👔" },
			{ id: "PLAYED_WITH_RIBERY", label: "PLAYED WITH RIBERY", icon: "🏃" },
		],
	},
	{
		id: "modern",
		name: "Modern Football Card",
		description: "Based on the image provided",
		choices: [
			{ id: "PSG", label: "PSG", icon: "🔵🔴" },
			{ id: "ESP", label: "ESP", icon: "🇪🇸" },
			{
				id: "WORLD_CUP_WINNER",
				label: "WORLD CUP WINNER\nSINCE 1958",
				icon: "🏆",
			},
			{ id: "ITA", label: "ITA", icon: "🇮🇹" },
			{ id: "NLD", label: "NLD", icon: "🇳🇱" },
			{ id: "FERGUSON", label: "MANAGED BY\nFERGUSON", icon: "👔" },
			{ id: "PSV", label: "PSV", icon: "🔴⚪" },
			{ id: "NLD_RMA", label: "NLD + RMA", icon: "⚪" },
			{
				id: "BRAZILIAN_TOP_DIV",
				label: "PLAYED IN BRAZILIAN\nTOP DIV SINCE 1996",
				icon: "🇧🇷",
			},
			{ id: "MUN", label: "MUN", icon: "🔴" },
			{
				id: "CL_GOLDEN_BOOT",
				label: "CHAMPIONS LGE GOLDEN\nBOOT WINNER SINCE 1992/93",
				icon: "👟",
			},
			{ id: "CR7", label: "PLAYED WITH\nCRISTIANO RONALDO", icon: "🏃" },
			{ id: "LEI", label: "LEI", icon: "🦊" },
			{
				id: "ENGLISH_GOLDEN_BOOT",
				label: "ENGLISH TOP DIV\nGOLDEN BOOT WINNER\nSINCE 1992/93",
				icon: "👟",
			},
			{ id: "ARS", label: "ARS", icon: "🔴" },
			{ id: "SVN", label: "SVN", icon: "🇸🇮" },
		],
	},
];

const seedCards = async () => {
	try {
		await Card.deleteMany({});
		await Card.insertMany(cards);
		console.log("Cards seeded successfully");
	} catch (error) {
		console.error("Error seeding cards:", error);
	}
};

module.exports = { cards };
