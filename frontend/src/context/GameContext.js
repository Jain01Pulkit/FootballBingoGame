import React, { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

const initialState = {
	score: 0,
	playersLeft: 42,
	wildcardAvailable: true,
	gameHistory: [],
	currentPlayer: null,
};

function gameReducer(state, action) {
	switch (action.type) {
		case "SET_PLAYER":
			return { ...state, currentPlayer: action.payload };
		case "UPDATE_SCORE":
			return { ...state, score: state.score + action.payload };
		case "USE_WILDCARD":
			return { ...state, wildcardAvailable: false };
		case "NEXT_PLAYER":
			return {
				...state,
				playersLeft: state.playersLeft - 1,
				gameHistory: [...state.gameHistory, state.currentPlayer],
			};
		case "RESET_GAME":
			return initialState;
		default:
			return state;
	}
}

export function GameProvider({ children }) {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	return (
		<GameContext.Provider value={{ state, dispatch }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	return useContext(GameContext);
}
