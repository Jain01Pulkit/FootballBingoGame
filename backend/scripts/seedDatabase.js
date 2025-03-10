require("dotenv").config();
const mongoose = require("mongoose");
const Player = require("../models/Player");
const Card = require("../models/Card");
const { cards } = require("./seedCards");

// Use environment variable directly if config fails
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/football-bingo";

const PLAYERS_PER_CARD = 42;

// Add these additional players
const additionalPlayers = [
	// Modern Card Players
	{
		id: 46,
		cardId: "modern",
		name: "MARCUS RASHFORD",
		correctAnswers: ["MUN", "ENGLISH_GOLDEN_BOOT"],
		nationality: "England",
		currentTeam: "Manchester United",
	},
	{
		id: 47,
		cardId: "modern",
		name: "BUKAYO SAKA",
		correctAnswers: ["ARS"],
		nationality: "England",
		currentTeam: "Arsenal",
	},
	{
		id: 48,
		cardId: "modern",
		name: "MARTIN ODEGAARD",
		correctAnswers: ["ARS", "NLD_RMA"],
		nationality: "Norway",
		currentTeam: "Arsenal",
	},
	{
		id: 49,
		cardId: "modern",
		name: "ERLING HAALAND",
		correctAnswers: ["NLD", "BRAZILIAN_TOP_DIV"],
		nationality: "Norway",
		currentTeam: "Manchester City",
	},
	{
		id: 50,
		cardId: "modern",
		name: "JAMES MADDISON",
		correctAnswers: ["LEI"],
		nationality: "England",
		currentTeam: "Tottenham",
	},

	// Carrick Card Players
	{
		id: 51,
		cardId: "carrick",
		name: "KINGSLEY COMAN",
		correctAnswers: ["BAY", "JUV"],
		nationality: "France",
		currentTeam: "Bayern Munich",
	},
	{
		id: 52,
		cardId: "carrick",
		name: "DIDIER DROGBA",
		correctAnswers: ["CL_WINNER_93", "CIV"],
		nationality: "Ivory Coast",
		currentTeam: "Retired",
	},
	{
		id: 53,
		cardId: "carrick",
		name: "WESLEY SNEIJDER",
		correctAnswers: ["AJA", "NLD_BAY", "DUTCH_DIV_57"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
	{
		id: 54,
		cardId: "carrick",
		name: "PEPE",
		correctAnswers: ["POR", "CL_WINNER_93"],
		nationality: "Portugal",
		currentTeam: "Porto",
	},
	{
		id: 55,
		cardId: "carrick",
		name: "ERLING HAALAND",
		correctAnswers: ["DOR", "NOR"],
		nationality: "Norway",
		currentTeam: "Manchester City",
	},
	{
		id: 56,
		cardId: "carrick",
		name: "UNAI EMERY",
		correctAnswers: ["MANAGED_BY_EMERY"],
		nationality: "Spain",
		currentTeam: "Aston Villa",
	},
	{
		id: 57,
		cardId: "modern",
		name: "JAN OBLAK",
		correctAnswers: ["SVN"],
		nationality: "Slovenia",
		currentTeam: "Atletico Madrid",
	},
	{
		id: 58,
		cardId: "modern",
		name: "MEMPHIS DEPAY",
		correctAnswers: ["PSV", "NLD"],
		nationality: "Netherlands",
		currentTeam: "Atletico Madrid",
	},
	{
		id: 59,
		cardId: "carrick",
		name: "THOMAS MÜLLER",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 60,
		cardId: "modern",
		name: "CRISTIANO RONALDO",
		correctAnswers: ["CR7", "FERGUSON"],
		nationality: "Portugal",
		currentTeam: "Al Nassr",
	},
	{
		id: 61,
		cardId: "carrick",
		name: "ZLATAN IBRAHIMOVIC",
		correctAnswers: ["AJA", "JUV", "DUTCH_DIV_57"],
		nationality: "Sweden",
		currentTeam: "Retired",
	},
	{
		id: 62,
		cardId: "modern",
		name: "PAUL POGBA",
		correctAnswers: ["MUN", "WORLD_CUP_WINNER"],
		nationality: "France",
		currentTeam: "Juventus",
	},
	{
		id: 63,
		cardId: "modern",
		name: "VIRGIL VAN DIJK",
		correctAnswers: ["PSV", "NLD"],
		nationality: "Netherlands",
		currentTeam: "Liverpool",
	},
	{
		id: 64,
		cardId: "carrick",
		name: "SADIO MANE",
		correctAnswers: ["BAY"],
		nationality: "Senegal",
		currentTeam: "Al Nassr",
	},
];

// Add these additional players
const finalAdditionalPlayers = [
	// Modern Card Players
	{
		id: 84,
		cardId: "modern",
		name: "RAPHAEL VARANE",
		correctAnswers: ["MUN", "CR7"],
		nationality: "France",
		currentTeam: "Manchester United",
	},
	{
		id: 85,
		cardId: "modern",
		name: "BERNARDO SILVA",
		correctAnswers: ["PSG", "CR7"],
		nationality: "Portugal",
		currentTeam: "Manchester City",
	},
	{
		id: 86,
		cardId: "modern",
		name: "MASON MOUNT",
		correctAnswers: ["MUN", "ENGLISH_GOLDEN_BOOT"],
		nationality: "England",
		currentTeam: "Manchester United",
	},
	{
		id: 87,
		cardId: "modern",
		name: "JADON SANCHO",
		correctAnswers: ["MUN", "DOR"],
		nationality: "England",
		currentTeam: "Manchester United",
	},
	{
		id: 88,
		cardId: "modern",
		name: "BENJAMIN PAVARD",
		correctAnswers: ["WORLD_CUP_WINNER"],
		nationality: "France",
		currentTeam: "Inter Milan",
	},
	{
		id: 89,
		cardId: "carrick",
		name: "NOUSSAIR MAZRAOUI",
		correctAnswers: ["BAY", "AJA", "NLD_BAY", "DUTCH_DIV_57"],
		nationality: "Morocco",
		currentTeam: "Bayern Munich",
	},
	{
		id: 90,
		cardId: "carrick",
		name: "SEBASTIEN HALLER",
		correctAnswers: ["AJA", "DOR", "DUTCH_DIV_57"],
		nationality: "Ivory Coast",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 91,
		cardId: "modern",
		name: "ANTONY",
		correctAnswers: ["MUN", "BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Manchester United",
	},
	{
		id: 92,
		cardId: "carrick",
		name: "ERIC MAXIM CHOUPO-MOTING",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Cameroon",
		currentTeam: "Bayern Munich",
	},
	{
		id: 93,
		cardId: "modern",
		name: "LISANDRO MARTINEZ",
		correctAnswers: ["MUN", "WORLD_CUP_WINNER"],
		nationality: "Argentina",
		currentTeam: "Manchester United",
	},
	{
		id: 94,
		cardId: "carrick",
		name: "DUSAN VLAHOVIC",
		correctAnswers: ["JUV"],
		nationality: "Serbia",
		currentTeam: "Juventus",
	},
	{
		id: 95,
		cardId: "modern",
		name: "RICHARLISON",
		correctAnswers: ["BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Tottenham",
	},
	{
		id: 96,
		cardId: "carrick",
		name: "ALPHONSO DAVIES",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Canada",
		currentTeam: "Bayern Munich",
	},
	{
		id: 97,
		cardId: "modern",
		name: "RUBEN NEVES",
		correctAnswers: ["POR"],
		nationality: "Portugal",
		currentTeam: "Al-Hilal",
	},
	{
		id: 98,
		cardId: "carrick",
		name: "DAYOT UPAMECANO",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "France",
		currentTeam: "Bayern Munich",
	},
	{
		id: 99,
		cardId: "modern",
		name: "PHIL FODEN",
		correctAnswers: ["ENGLISH_GOLDEN_BOOT"],
		nationality: "England",
		currentTeam: "Manchester City",
	},
	{
		id: 100,
		cardId: "carrick",
		name: "LEROY SANE",
		correctAnswers: ["BAY", "DOR"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 101,
		cardId: "modern",
		name: "CHRISTIAN ERIKSEN",
		correctAnswers: ["MUN", "NLD"],
		nationality: "Denmark",
		currentTeam: "Manchester United",
	},
	{
		id: 102,
		cardId: "carrick",
		name: "FRANCK RIBERY",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "France",
		currentTeam: "Retired",
	},
	{
		id: 103,
		cardId: "modern",
		name: "EDERSON",
		correctAnswers: ["BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Manchester City",
	},
	{
		id: 104,
		cardId: "carrick",
		name: "ARJEN ROBBEN",
		correctAnswers: ["BAY", "CL_WINNER_93", "NLD_BAY", "DUTCH_DIV_57"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
	{
		id: 105,
		cardId: "modern",
		name: "DECLAN RICE",
		correctAnswers: ["ARS"],
		nationality: "England",
		currentTeam: "Arsenal",
	},
	{
		id: 106,
		cardId: "carrick",
		name: "JEROME BOATENG",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Germany",
		currentTeam: "Free Agent",
	},
	{
		id: 107,
		cardId: "modern",
		name: "OLEKSANDR ZINCHENKO",
		correctAnswers: ["ARS"],
		nationality: "Ukraine",
		currentTeam: "Arsenal",
	},
	{
		id: 108,
		cardId: "carrick",
		name: "MARIO GOTZE",
		correctAnswers: ["BAY", "DOR"],
		nationality: "Germany",
		currentTeam: "Eintracht Frankfurt",
	},
	{
		id: 109,
		cardId: "modern",
		name: "JAMES WARD-PROWSE",
		correctAnswers: ["LEI"],
		nationality: "England",
		currentTeam: "West Ham",
	},
	{
		id: 110,
		cardId: "carrick",
		name: "IVAN PERISIC",
		correctAnswers: ["BAY", "TOT"],
		nationality: "Croatia",
		currentTeam: "Tottenham",
	},
];

// Add this before the players array
const lastBatchPlayers = [
	// Classic Card (4 more)
	{
		id: 111,
		cardId: "classic",
		name: "OLIVIER GIROUD",
		correctAnswers: ["ITA", "MIL"],
		nationality: "France",
		currentTeam: "AC Milan",
	},
	{
		id: 112,
		cardId: "classic",
		name: "DOMENICO BERARDI",
		correctAnswers: ["ITA", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Sassuolo",
	},
	{
		id: 113,
		cardId: "classic",
		name: "MATTHIJS DE LIGT",
		correctAnswers: ["NLD", "JUV", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Bayern Munich",
	},
	{
		id: 114,
		cardId: "classic",
		name: "MARCO REUS",
		correctAnswers: ["GER", "BVB"],
		nationality: "Germany",
		currentTeam: "Borussia Dortmund",
	},

	// Modern Card (14 more)
	{
		id: 115,
		cardId: "modern",
		name: "BRUNO FERNANDES",
		correctAnswers: ["MUN", "CR7"],
		nationality: "Portugal",
		currentTeam: "Manchester United",
	},
	{
		id: 116,
		cardId: "modern",
		name: "GABRIEL MARTINELLI",
		correctAnswers: ["ARS", "BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Arsenal",
	},
	{
		id: 117,
		cardId: "modern",
		name: "HARRY KANE",
		correctAnswers: ["ENGLISH_GOLDEN_BOOT"],
		nationality: "England",
		currentTeam: "Bayern Munich",
	},
	{
		id: 118,
		cardId: "modern",
		name: "LUCAS PAQUETA",
		correctAnswers: ["BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "West Ham",
	},
	{
		id: 119,
		cardId: "modern",
		name: "RAPHAEL GUERREIRO",
		correctAnswers: ["PSG"],
		nationality: "Portugal",
		currentTeam: "Bayern Munich",
	},
	{
		id: 120,
		cardId: "modern",
		name: "REECE JAMES",
		correctAnswers: ["ENGLISH_GOLDEN_BOOT"],
		nationality: "England",
		currentTeam: "Chelsea",
	},
	{
		id: 121,
		cardId: "modern",
		name: "DARWIN NUNEZ",
		correctAnswers: ["PSV"],
		nationality: "Uruguay",
		currentTeam: "Liverpool",
	},
	{
		id: 122,
		cardId: "modern",
		name: "ENZO FERNANDEZ",
		correctAnswers: ["WORLD_CUP_WINNER"],
		nationality: "Argentina",
		currentTeam: "Chelsea",
	},
	{
		id: 123,
		cardId: "modern",
		name: "ALEXANDER ISAK",
		correctAnswers: ["SVN"],
		nationality: "Sweden",
		currentTeam: "Newcastle",
	},
	{
		id: 124,
		cardId: "modern",
		name: "EMILIANO MARTINEZ",
		correctAnswers: ["WORLD_CUP_WINNER"],
		nationality: "Argentina",
		currentTeam: "Aston Villa",
	},
	{
		id: 125,
		cardId: "modern",
		name: "DIOGO JOTA",
		correctAnswers: ["POR"],
		nationality: "Portugal",
		currentTeam: "Liverpool",
	},
	{
		id: 126,
		cardId: "modern",
		name: "AARON RAMSDALE",
		correctAnswers: ["ARS"],
		nationality: "England",
		currentTeam: "Arsenal",
	},
	{
		id: 127,
		cardId: "modern",
		name: "RODRIGO BENTANCUR",
		correctAnswers: ["JUV"],
		nationality: "Uruguay",
		currentTeam: "Tottenham",
	},
	{
		id: 128,
		cardId: "modern",
		name: "RAPHINHA",
		correctAnswers: ["BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Barcelona",
	},

	// Carrick Card (17 more)
	{
		id: 129,
		cardId: "carrick",
		name: "FRENKIE DE JONG",
		correctAnswers: ["AJA", "DUTCH_DIV_57"],
		nationality: "Netherlands",
		currentTeam: "Barcelona",
	},
	{
		id: 130,
		cardId: "carrick",
		name: "MANUEL NEUER",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	// ... add 15 more carrick card players here
	{
		id: 131,
		cardId: "carrick",
		name: "DAVID ALABA",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Austria",
		currentTeam: "Real Madrid",
	},
	{
		id: 132,
		cardId: "carrick",
		name: "ANDRE ONANA",
		correctAnswers: ["AJA", "DUTCH_DIV_57"],
		nationality: "Cameroon",
		currentTeam: "Manchester United",
	},
	{
		id: 133,
		cardId: "carrick",
		name: "NICOLAS JACKSON",
		correctAnswers: ["MANAGED_BY_EMERY"],
		nationality: "Senegal",
		currentTeam: "Chelsea",
	},
	{
		id: 134,
		cardId: "carrick",
		name: "CHRISTIAN ERIKSEN",
		correctAnswers: ["AJA", "TOT", "DUTCH_DIV_57"],
		nationality: "Denmark",
		currentTeam: "Manchester United",
	},
	{
		id: 135,
		cardId: "carrick",
		name: "LEON GORETZKA",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 136,
		cardId: "carrick",
		name: "RUBEN NEVES",
		correctAnswers: ["POR"],
		nationality: "Portugal",
		currentTeam: "Al-Hilal",
	},
	{
		id: 137,
		cardId: "carrick",
		name: "EDINSON CAVANI",
		correctAnswers: ["MANAGED_BY_EMERY"],
		nationality: "Uruguay",
		currentTeam: "Boca Juniors",
	},
	{
		id: 138,
		cardId: "carrick",
		name: "SERHOU GUIRASSY",
		correctAnswers: ["DOR"],
		nationality: "Guinea",
		currentTeam: "Stuttgart",
	},
	{
		id: 139,
		cardId: "carrick",
		name: "STEVEN BERGHUIS",
		correctAnswers: ["AJA", "DUTCH_DIV_57"],
		nationality: "Netherlands",
		currentTeam: "Ajax",
	},
	{
		id: 140,
		cardId: "carrick",
		name: "MARTIN ODEGAARD",
		correctAnswers: ["NOR"],
		nationality: "Norway",
		currentTeam: "Arsenal",
	},
	{
		id: 141,
		cardId: "carrick",
		name: "YANN SOMMER",
		correctAnswers: ["BAY"],
		nationality: "Switzerland",
		currentTeam: "Inter Milan",
	},
	{
		id: 142,
		cardId: "carrick",
		name: "SEBASTIEN HALLER",
		correctAnswers: ["AJA", "DOR", "DUTCH_DIV_57"],
		nationality: "Ivory Coast",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 143,
		cardId: "carrick",
		name: "WILFRIED GNONTO",
		correctAnswers: ["AJA", "DUTCH_DIV_57"],
		nationality: "Italy",
		currentTeam: "Leeds United",
	},
	{
		id: 144,
		cardId: "carrick",
		name: "ALEX TELLES",
		correctAnswers: ["MANAGED_BY_EMERY"],
		nationality: "Brazil",
		currentTeam: "Al-Nassr",
	},
	{
		id: 145,
		cardId: "carrick",
		name: "ERLING HAALAND",
		correctAnswers: ["DOR", "NOR"],
		nationality: "Norway",
		currentTeam: "Manchester City",
	},
];

const players = [
	// Classic Card Players
	{
		id: 42,
		cardId: "classic",
		name: "JULIAN BRANDT",
		correctAnswers: ["GER", "BVB"],
		nationality: "Germany",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 41,
		cardId: "classic",
		name: "ROBERT LEWANDOWSKI",
		correctAnswers: ["GER", "BVB", "PLAYED_WITH_RIBERY"],
		nationality: "Poland",
		currentTeam: "Barcelona",
	},
	{
		id: 40,
		cardId: "classic",
		name: "LUKA MODRIC",
		correctAnswers: ["ANCELOTTI", "PLAYED_WITH_RIBERY"],
		nationality: "Croatia",
		currentTeam: "Real Madrid",
	},
	{
		id: 39,
		cardId: "classic",
		name: "VIRGIL VAN DIJK",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Liverpool",
	},
	{
		id: 38,
		cardId: "classic",
		name: "JUDE BELLINGHAM",
		correctAnswers: ["GER", "ANCELOTTI"],
		nationality: "England",
		currentTeam: "Real Madrid",
	},
	{
		id: 37,
		cardId: "classic",
		name: "VINICIUS JR",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Real Madrid",
	},
	{
		id: 36,
		cardId: "classic",
		name: "DECLAN RICE",
		correctAnswers: ["WHU"],
		nationality: "England",
		currentTeam: "Arsenal",
	},
	{
		id: 35,
		cardId: "classic",
		name: "MARCUS THURAM",
		correctAnswers: ["INT"],
		nationality: "France",
		currentTeam: "Inter Milan",
	},
	{
		id: 34,
		cardId: "classic",
		name: "ZLATAN IBRAHIMOVIC",
		correctAnswers: ["MIL", "INT", "JUV", "ITALIAN_GOLDEN_BOOT"],
		nationality: "Sweden",
		currentTeam: "Retired",
	},
	{
		id: 33,
		cardId: "classic",
		name: "OLIVIER GIROUD",
		correctAnswers: ["MIL"],
		nationality: "France",
		currentTeam: "AC Milan",
	},
	{
		id: 32,
		cardId: "classic",
		name: "LUCAS PAQUETA",
		correctAnswers: ["WHU", "BRA", "MIL"],
		nationality: "Brazil",
		currentTeam: "West Ham",
	},
	{
		id: 31,
		cardId: "classic",
		name: "WESLEY SNEIJDER",
		correctAnswers: ["NLD", "INT", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
	{
		id: 30,
		cardId: "modern",
		name: "KARIM BENZEMA",
		correctAnswers: ["ESP", "CR7", "WORLD_CUP_WINNER"],
		nationality: "France",
		currentTeam: "Al-Ittihad",
	},
	{
		id: 29,
		cardId: "modern",
		name: "NEYMAR JR",
		correctAnswers: ["PSG", "BRAZILIAN_TOP_DIV"],
		nationality: "Brazil",
		currentTeam: "Al-Hilal",
	},
	{
		id: 28,
		cardId: "classic",
		name: "MARCO REUS",
		correctAnswers: ["GER", "BVB"],
		nationality: "Germany",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 27,
		cardId: "classic",
		name: "CHRISTIAN PULISIC",
		correctAnswers: ["BVB", "MIL"],
		nationality: "USA",
		currentTeam: "AC Milan",
	},
	{
		id: 26,
		cardId: "classic",
		name: "MEMPHIS DEPAY",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Atletico Madrid",
	},
	{
		id: 25,
		cardId: "classic",
		name: "THIAGO SILVA",
		correctAnswers: ["BRA", "MIL", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Chelsea",
	},
	{
		id: 24,
		cardId: "classic",
		name: "TONI KROOS",
		correctAnswers: ["GER", "ANCELOTTI", "PLAYED_WITH_RIBERY"],
		nationality: "Germany",
		currentTeam: "Real Madrid",
	},
	{
		id: 23,
		cardId: "classic",
		name: "EDIN DZEKO",
		correctAnswers: ["INT", "ITALIAN_GOLDEN_BOOT"],
		nationality: "Bosnia",
		currentTeam: "Fenerbahce",
	},
	{
		id: 22,
		cardId: "classic",
		name: "GIANLUCA SCAMACCA",
		correctAnswers: ["WHU", "ITA"],
		nationality: "Italy",
		currentTeam: "Atalanta",
	},
	{
		id: 21,
		cardId: "classic",
		name: "RODRYGO",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Real Madrid",
	},
	{
		id: 20,
		cardId: "carrick",
		name: "ROBERT LEWANDOWSKI",
		correctAnswers: ["BAY", "CL_WINNER_93"],
		nationality: "Poland",
		currentTeam: "Barcelona",
	},
	{
		id: 19,
		cardId: "carrick",
		name: "HARRY KANE",
		correctAnswers: ["BAY", "TOT"],
		nationality: "England",
		currentTeam: "Bayern Munich",
	},
	{
		id: 18,
		cardId: "classic",
		name: "DONNY VAN DE BEEK",
		correctAnswers: ["NLD", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Manchester United",
	},
	{
		id: 17,
		cardId: "classic",
		name: "CASEMIRO",
		correctAnswers: ["BRA", "ANCELOTTI"],
		nationality: "Brazil",
		currentTeam: "Manchester United",
	},
	{
		id: 16,
		cardId: "classic",
		name: "EMERSON",
		correctAnswers: ["WHU", "ITA"],
		nationality: "Italy",
		currentTeam: "West Ham",
	},
	{
		id: 15,
		cardId: "classic",
		name: "THOMAS MÜLLER",
		correctAnswers: ["GER", "PLAYED_WITH_RIBERY"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 14,
		cardId: "classic",
		name: "RICHARLISON",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Tottenham",
	},
	{
		id: 13,
		cardId: "classic",
		name: "NICOLO BARELLA",
		correctAnswers: ["ITA", "INT", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Inter Milan",
	},
	{
		id: 12,
		cardId: "classic",
		name: "FEDERICO CHIESA",
		correctAnswers: ["ITA", "JUV", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Juventus",
	},
	{
		id: 11,
		cardId: "classic",
		name: "MARIO GÖTZE",
		correctAnswers: ["GER", "BVB"],
		nationality: "Germany",
		currentTeam: "Eintracht Frankfurt",
	},
	{
		id: 10,
		cardId: "classic",
		name: "RAPHINHA",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Barcelona",
	},
	{
		id: 9,
		cardId: "classic",
		name: "GIACOMO RASPADORI",
		correctAnswers: ["ITA", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Napoli",
	},
	{
		id: 8,
		cardId: "classic",
		name: "DENZEL DUMFRIES",
		correctAnswers: ["NLD", "INT", "DUTCH_DIV"],
		nationality: "Netherlands",
		currentTeam: "Inter Milan",
	},
	{
		id: 7,
		cardId: "classic",
		name: "JAMAL MUSIALA",
		correctAnswers: ["GER"],
		nationality: "Germany",
		currentTeam: "Bayern Munich",
	},
	{
		id: 6,
		cardId: "classic",
		name: "GABRIEL JESUS",
		correctAnswers: ["BRA", "COPA_AMERICA_WINNER"],
		nationality: "Brazil",
		currentTeam: "Arsenal",
	},
	{
		id: 5,
		cardId: "classic",
		name: "SANDRO TONALI",
		correctAnswers: ["ITA", "MIL"],
		nationality: "Italy",
		currentTeam: "Newcastle",
	},
	{
		id: 4,
		cardId: "classic",
		name: "MARCO VERRATTI",
		correctAnswers: ["ITA", "EUROS_WINNER"],
		nationality: "Italy",
		currentTeam: "Al-Arabi",
	},
	{
		id: 3,
		cardId: "classic",
		name: "LUCAS MOURA",
		correctAnswers: ["BRA"],
		nationality: "Brazil",
		currentTeam: "Sao Paulo",
	},
	{
		id: 2,
		cardId: "classic",
		name: "SEBASTIEN HALLER",
		correctAnswers: ["NLD", "BVB", "DUTCH_DIV"],
		nationality: "Ivory Coast",
		currentTeam: "Borussia Dortmund",
	},
	{
		id: 1,
		cardId: "classic",
		name: "ARJEN ROBBEN",
		correctAnswers: ["NLD", "DUTCH_DIV", "PLAYED_WITH_RIBERY"],
		nationality: "Netherlands",
		currentTeam: "Retired",
	},
	// Modern Card Players (add more)
	{
		id: 43,
		cardId: "modern",
		name: "KYLIAN MBAPPE",
		correctAnswers: ["PSG", "WORLD_CUP_WINNER"],
		nationality: "France",
		currentTeam: "PSG",
	},
	// Carrick Card Players (add more)
	{
		id: 44,
		cardId: "carrick",
		name: "MATTHIJS DE LIGT",
		correctAnswers: ["BAY", "JUV", "AJA", "NLD_BAY", "DUTCH_DIV_57"],
		nationality: "Netherlands",
		currentTeam: "Bayern Munich",
	},
	{
		id: 45,
		cardId: "carrick",
		name: "RAPHAEL VARANE",
		correctAnswers: ["CL_WINNER_93", "PLAYED_WITH_R9"],
		nationality: "France",
		currentTeam: "Manchester United",
	},
].concat(additionalPlayers, finalAdditionalPlayers, lastBatchPlayers);

// Update the backend route to filter players by cardId
const getPlayersByCardId = async (cardId) => {
	return await Player.find({ cardId });
};

const validatePlayerCounts = (players) => {
	const cardCounts = {
		classic: 0,
		modern: 0,
		carrick: 0,
	};

	players.forEach((player) => {
		cardCounts[player.cardId]++;
	});

	console.log("Current player counts:", cardCounts);

	if (Object.values(cardCounts).some((count) => count !== PLAYERS_PER_CARD)) {
		throw new Error(
			`Each card must have exactly ${PLAYERS_PER_CARD} players. Current counts: ${JSON.stringify(cardCounts)}`
		);
	}
};

async function seedDatabase() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("Connected to MongoDB");

		// Validate player counts before inserting
		validatePlayerCounts(players);

		// Clear and seed players
		await Player.deleteMany({});
		console.log("Cleared existing players");
		await Player.insertMany(players);
		console.log(`Seeded database with ${players.length} players`);

		// Log player counts per card
		const classicCount = await Player.countDocuments({ cardId: "classic" });
		const modernCount = await Player.countDocuments({ cardId: "modern" });
		const carrickCount = await Player.countDocuments({ cardId: "carrick" });

		console.log("Player counts per card:");
		console.log(`- Classic card: ${classicCount} players`);
		console.log(`- Modern card: ${modernCount} players`);
		console.log(`- Carrick card: ${carrickCount} players`);

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
