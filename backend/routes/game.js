const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const rateLimit = require("express-rate-limit");
const Card = require("../models/Card");

// Keep track of game state
let gameState = {
	usedPlayerIds: new Set(),
	playerOrder: [], // Store shuffled order of player IDs
	currentIndex: 0,
	totalPlayers: 42,
};

// Add this constant at the top of the file with other constants
const CHOICES = [
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
	{ id: "BO4", label: "BVB", icon: "⚫🔴" },
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
];

// Create a limiter for validate endpoint
const validateLimiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 1, // limit each IP to 1 request per windowMs
	message: { error: "Too many validation attempts, please wait." },
});

// Add this function before the routes
const generateChoices = async (player) => {
	// Return all available choices
	// In a more complex implementation, you might want to filter or randomize choices
	// based on the player's attributes
	return CHOICES;
};

// Helper function to shuffle array
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Reset game and create new shuffled order
router.post("/reset", async (req, res) => {
	try {
		// Reset the game state in the database
		await Player.updateMany(
			{},
			{
				isUsed: false, // Mark all players as unused
				lastUsed: null, // Clear the last used timestamp
			}
		);

		// Reset any other game-related state you might have

		res.json({ message: "Game reset successfully" });
	} catch (error) {
		console.error("Error resetting game:", error);
		res.status(500).json({ error: "Failed to reset game" });
	}
});

// Get next player in shuffled order
router.get("/player/:cardId", async (req, res) => {
	try {
		const { cardId } = req.params;
		const card = await Card.findOne({ id: cardId });

		if (!card) {
			return res.status(404).json({ error: "Card not found" });
		}

		// First, check total players and reset if needed
		const totalUnusedPlayers = await Player.countDocuments({ isUsed: false });

		// Only reset if ALL players have been used
		if (totalUnusedPlayers === 0) {
			await Player.updateMany(
				{},
				{
					isUsed: false,
					lastUsed: null,
				}
			);
			console.log("All players used - resetting game");
		}

		// Get fresh count after potential reset
		const totalPlayers = await Player.countDocuments({ isUsed: false });

		// Get a random unused player using aggregation pipeline
		const randomPlayer = await Player.aggregate([
			{ $match: { isUsed: false } },
			{ $sample: { size: 1 } },
		]).exec();

		if (!randomPlayer || randomPlayer.length === 0) {
			return res.status(404).json({ message: "No more players available" });
		}

		const player = randomPlayer[0];

		// Mark the player as used
		await Player.findByIdAndUpdate(player._id, {
			isUsed: true,
			lastUsed: new Date(),
		});

		res.json({
			player: {
				id: player._id,
				name: player.name,
			},
			choices: card.choices,
			playersLeft: totalPlayers - 1,
		});
	} catch (error) {
		console.error("Error getting player:", error);
		res.status(500).json({ error: "Failed to get player" });
	}
});

// Validate answer
router.post("/validate", validateLimiter, async (req, res) => {
	try {
		const { playerId, answer } = req.body;
		const player = await Player.findById(playerId);

		if (!player) {
			return res.status(404).json({ message: "Player not found" });
		}

		const isCorrect = player.correctAnswers.includes(answer);
		res.json({
			isCorrect,
			message: isCorrect ? "Correct!" : "Wrong answer!",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Update the cards route to include all fields
router.get("/cards", async (req, res) => {
	try {
		// Change the projection to include all necessary fields
		const cards = await Card.find(
			{},
			{
				_id: 1,
				id: 1,
				name: 1,
				description: 1,
				choices: 1,
			}
		).lean(); // Add lean() for better performance

		console.log("Sending cards:", cards); // Add debug log
		res.json(cards);
	} catch (error) {
		console.error("Error fetching cards:", error);
		res.status(500).json({ error: "Failed to fetch cards" });
	}
});

module.exports = router;
