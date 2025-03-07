import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const gameService = {
	getCards: async () => {
		try {
			console.log("Making getCards API call");
			const response = await api.get("/game/cards");
			console.log("getCards API response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error fetching cards:", error);
			throw error;
		}
	},
	getPlayer: async (cardId) => {
		try {
			const response = await api.get(`/game/player/${cardId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching player:", error);
			throw error;
		}
	},
	validateAnswer: async (playerId, answer) => {
		try {
			const response = await api.post("/game/validate", { playerId, answer });
			return response.data;
		} catch (error) {
			if (error.response?.status === 429) {
				throw new Error("Please wait before trying again");
			}
			console.error("Error validating answer:", error);
			throw error;
		}
	},
	submitScore: (score) => api.post("/game/score", { score }),
	resetGame: async () => {
		try {
			const response = await api.post("/game/reset");
			return response.data;
		} catch (error) {
			console.error("Error resetting game:", error);
			throw error;
		}
	},
};

export default api;
