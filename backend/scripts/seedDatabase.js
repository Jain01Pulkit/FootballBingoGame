require("dotenv").config();
const mongoose = require("mongoose");
const Player = require("../models/Player");
const Card = require("../models/Card");
const { cards } = require("./seedCards");

// Use environment variable directly if config fails
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/football-bingo";

const players = [
	{
		id: 42,
		name: "JULIAN BRANDT",
		correctAnswers: ["GER", "BO4"],
		nationality: "Germany",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 41,
		name: "ROBERT LEWANDOWSKI",
		correctAnswers: ["GER", "BO4", "PLAYED_WITH_RIBERY"],
		nationality: "Poland",
		currentTeam: "Barcelona",
	},
	{
		id: 40,
		name: "LUKA MODRIC",
		correctAnswers: ["ANCELOTTI", "PLAYED_WITH_RIBERY"],
		nationality: "Croatia",
		currentTeam: "Real Madrid",
	},
	{
		id: 39,
		name: "VIRGIL VAN DIJK",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Liverpool",
	},
	{
		id: 38,
		name: "JUDE BELLINGHAM",
		correctAnswers: ["GER", "ANCELOTTI"],
		nationality: "England",
		currentTeam: "Real Madrid",
	},
	{
		id: 37,
		name: "VINICIUS JR",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Real Madrid",
	},
	{
		id: 36,
		name: "DECLAN RICE",
		correctAnswers: ["WHU"],
		nationality: "England",
		currentTeam: "Arsenal",
	},
	{
		id: 35,
		name: "MARCUS THURAM",
		correctAnswers: ["INT"],
		nationality: "France",
		currentTeam: "Inter Milan",
	},
	{
		id: 34,
		name: "ZLATAN IBRAHIMOVIC",
		correctAnswers: ["MIL", "INT", "JUV", "ITALIAN_GOLDEN_BOOT"],
		nationality: "Sweden",
		currentTeam: "Retired",
	},
	{
		id: 33,
		name: "OLIVIER GIROUD",
		correctAnswers: ["MIL"],
		nationality: "France",
		currentTeam: "AC Milan",
	},
	{
		id: 32,
		name: "LUCAS PAQUETA",
		correctAnswers: ["WHU", "BRA", "MIL"],
		nationality: "Brazil",
		currentTeam: "West Ham",
	},
	{
		id: 31,
		name: "WESLEY SNEIJDER",
		correctAnswers: ["NLD", "INT", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
	{
		id: 30,
		name: "KARIM BENZEMA",
		correctAnswers: ["ANCELOTTI", "PLAYED_WITH_RIBERY"],
		nationality: "France",
		currentTeam: "Al-Ittihad",
	},
	{
		id: 29,
		name: "NEYMAR JR",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Al-Hilal",
	},
	{
		id: 28,
		name: "MARCO REUS",
		correctAnswers: ["GER", "BO4"],
		nationality: "Germany",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 27,
		name: "CHRISTIAN PULISIC",
		correctAnswers: ["BO4", "MIL"],
		nationality: "USA",
		currentTeam: "AC Milan",
	},
	{
		id: 26,
		name: "MEMPHIS DEPAY",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Atletico Madrid",
	},
	{
		id: 25,
		name: "THIAGO SILVA",
		correctAnswers: ["BRA", "MIL", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Chelsea",
	},
	{
		id: 24,
		name: "TONI KROOS",
		correctAnswers: ["GER", "ANCELOTTI", "PLAYED_WITH_RIBERY"],
		nationality: "Germany",
		currentTeam: "Real Madrid",
	},
	{
		id: 23,
		name: "EDIN DZEKO",
		correctAnswers: ["INT", "ITALIAN_GOLDEN_BOOT"],
		nationality: "Bosnia",
		currentTeam: "Fenerbahce",
	},
	{
		id: 22,
		name: "GIANLUCA SCAMACCA",
		correctAnswers: ["WHU", "ITA"],
		nationality: "Italy",
		currentTeam: "Atalanta",
	},
	{
		id: 21,
		name: "RODRYGO",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Real Madrid",
	},
	{
		id: 20,
		name: "MATTHIJS DE LIGT",
		correctAnswers: ["NLD", "JUV", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Bayern Munich",
	},
	{
		id: 19,
		name: "CIRO IMMOBILE",
		correctAnswers: ["ITA", "BO4", "ITALIAN_GOLDEN_BOOT"],
		nationality: "Italy",
		currentTeam: "Lazio",
	},
	{
		id: 18,
		name: "DONNY VAN DE BEEK",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Manchester United",
	},
	{
		id: 17,
		name: "CASEMIRO",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Manchester United",
	},
	{
		id: 16,
		name: "EMERSON",
		correctAnswers: ["WHU", "ITA"],
		nationality: "Italy",
		currentTeam: "West Ham",
	},
	{
		id: 15,
		name: "THOMAS MÜLLER",
		correctAnswers: ["GER", "PLAYED_WITH_RIBERY"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 14,
		name: "RICHARLISON",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Tottenham",
	},
	{
		id: 13,
		name: "NICOLO BARELLA",
		correctAnswers: ["ITA", "INT", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Inter Milan",
	},
	{
		id: 12,
		name: "FEDERICO CHIESA",
		correctAnswers: ["ITA", "JUV", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Juventus",
	},
	{
		id: 11,
		name: "MARIO GÖTZE",
		correctAnswers: ["GER", "BO4"],
		nationality: "Germany",
		currentTeam: "Eintracht Frankfurt",
	},
	{
		id: 10,
		name: "RAPHINHA",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Barcelona",
	},
	{
		id: 9,
		name: "GIACOMO RASPADORI",
		correctAnswers: ["ITA", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Napoli",
	},
	{
		id: 8,
		name: "DENZEL DUMFRIES",
		correctAnswers: ["NLD", "INT", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Inter Milan",
	},
	{
		id: 7,
		name: "JAMAL MUSIALA",
		correctAnswers: ["GER"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 6,
		name: "GABRIEL JESUS",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Arsenal",
	},
	{
		id: 5,
		name: "SANDRO TONALI",
		correctAnswers: ["ITA", "MIL"],
		nationality: "Italy",
		currentTeam: "Newcastle",
	},
	{
		id: 4,
		name: "MARCO VERRATTI",
		correctAnswers: ["ITA", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Al-Arabi",
	},
	{
		id: 3,
		name: "LUCAS MOURA",
		correctAnswers: ["BRA"],
		nationality: "Brazil",
		currentTeam: "Sao Paulo",
	},
	{
		id: 2,
		name: "SEBASTIEN HALLER",
		correctAnswers: ["NLD", "BO4", "DUTCH_DIV"],
		nationality: "Ivory Coast",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 1,
		name: "ARJEN ROBBEN",
		correctAnswers: ["NLD", "DUTCH_DIV", "PLAYED_WITH_RIBERY"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
];

async function seedDatabase() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("Connected to MongoDB");

		// Clear and seed players
		await Player.deleteMany({});
		console.log("Cleared existing players");
		await Player.insertMany(players);
		console.log(`Seeded database with ${players.length} players`);

		// Clear and seed cards
		await Card.deleteMany({});
		console.log("Cleared existing cards");
		const cardsResult = await Card.insertMany(cards);
		console.log(`Seeded database with ${cardsResult.length} cards`);

		// Verify cards were saved correctly
		const savedCards = await Card.find({});
		console.log("Saved cards:", savedCards);

		await mongoose.disconnect();
		console.log("Done!");
		process.exit(0);
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

seedDatabase();
