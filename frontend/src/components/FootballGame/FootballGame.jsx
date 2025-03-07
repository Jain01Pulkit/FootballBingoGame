import React, { useState, useEffect } from 'react';
import { gameService } from '../../services/api';
import './FootballGame.css';
import CardSelector from '../CardSelector/CardSelector';

const FootballGame = () => {
  console.log('FootballGame component rendering');

  const [gameState, setGameState] = useState({
    currentPlayer: null,
    choices: [],
    playersLeft: 42,
    loading: true,
    error: null,
    gameOver: false
  });

  // Keep track of all selected choices throughout the game
  const [globalSelectedChoices, setGlobalSelectedChoices] = useState(new Set());
  // Keep track of correct/incorrect choices
  const [choiceResults, setChoiceResults] = useState({});

  // Add new state for modal
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Add new state for tracking API calls
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [availableCards, setAvailableCards] = useState([]);

  useEffect(() => {
    console.log('FootballGame useEffect running');
    const fetchCards = async () => {
      try {
        console.log('Fetching cards...');
        const cards = await gameService.getCards();
        console.log('Cards received from API:', cards);
        setAvailableCards(cards || []);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setAvailableCards([]);
      }
    };
    
    fetchCards();
  }, []);

  const handleCardSelect = async (cardId) => {
    console.log('Card selected:', cardId);
    setSelectedCard(cardId);
    
    try {
      // Reset game state
      await gameService.resetGame();
      setGlobalSelectedChoices(new Set());
      setChoiceResults({});
      setGameState({
        currentPlayer: null,
        choices: [],
        playersLeft: 42,
        loading: true,
        error: null,
        gameOver: false
      });

      // Fetch first player with selected card
      const data = await gameService.getPlayer(cardId);
      
      if (!data.player) {
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          loading: false
        }));
        return;
      }

      setGameState({
        currentPlayer: data.player,
        choices: data.choices,
        playersLeft: data.playersLeft,
        loading: false,
        error: null,
        gameOver: false
      });
    } catch (error) {
      console.error('Error starting game with card:', error);
      setGameState(prev => ({
        ...prev,
        error: 'Failed to start game',
        loading: false
      }));
    }
  };

  const handleGameEnd = async () => {
    // Calculate score before resetting states
    const correctAnswers = Object.values(choiceResults).filter(Boolean).length;
    const totalAnswers = Object.keys(choiceResults).length;
    
    setFinalScore(correctAnswers);
    setShowScoreModal(true);

    try {
      await gameService.resetGame();
      // Don't reset states until modal is closed
      setGameState({
        currentPlayer: null,
        choices: [],
        playersLeft: 42,
        loading: false,
        error: null,
        gameOver: false
      });
    } catch (error) {
      console.error('Error resetting game:', error);
      setGameState(prev => ({
        ...prev,
        error: 'Failed to reset game'
      }));
    }
  };

  const handleCloseModal = async () => {
    setShowScoreModal(false);
    setGlobalSelectedChoices(new Set());
    setChoiceResults({});
    setIsProcessing(false);
    setFinalScore(0);
    
    try {
      setGameState(prev => ({ ...prev, loading: true }));
      handleGetNextPlayer();
    } catch (error) {
      console.error('Error starting new game:', error);
      setGameState(prev => ({
        ...prev,
        error: 'Failed to start new game',
        loading: false
      }));
    }
  };

  const handleChoice = async (choiceId) => {
    if (isProcessing || globalSelectedChoices.has(choiceId)) return;

    try {
      setIsProcessing(true);

      const response = await gameService.validateAnswer(
        gameState.currentPlayer.id,
        choiceId
      );

      setGlobalSelectedChoices(prev => new Set([...prev, choiceId]));
      setChoiceResults(prev => ({
        ...prev,
        [choiceId]: response.isCorrect
      }));

      const updatedSelectedOptions = [...globalSelectedChoices, choiceId];
      if (updatedSelectedOptions.length === gameState.choices.length) {
        handleGameEnd();
        return;
      }

      setTimeout(async () => {
        try {
          handleGetNextPlayer();
        } catch (error) {
          console.error('Error fetching next player:', error);
          setGameState(prev => ({
            ...prev,
            error: 'Failed to load next player',
            loading: false
          }));
        } finally {
          setIsProcessing(false);
        }
      }, 1500);

    } catch (error) {
      console.error('Error validating choice:', error);
      if (error.response?.status === 429) {
        setGameState(prev => ({
          ...prev,
          error: 'Please wait before selecting another option'
        }));
        setTimeout(() => {
          setGameState(prev => ({ ...prev, error: null }));
        }, 2000);
      }
      setIsProcessing(false);
    }
  };

  const handleNextPlayer = () => {
    if (gameState.playersLeft <= 1) {
      setGameState(prev => ({
        ...prev,
        gameOver: true
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      loading: true
    }));
    handleGetNextPlayer();
  };

  const handleSkip = () => {
    handleNextPlayer();
  };

  const handleRestart = async (cardId) => {
    try {
      await gameService.resetGame();
      setGlobalSelectedChoices(new Set());
      setChoiceResults({});
      setGameState({
        currentPlayer: null,
        choices: [],
        playersLeft: 42,
        loading: true,
        error: null,
        gameOver: false
      });
      setSelectedCard(cardId);
      handleGetNextPlayer();
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const handleGetNextPlayer = async () => {
    try {
      const data = await gameService.getPlayer(selectedCard);
      if (!data.player) {
        handleGameEnd();
      } else {
        setGameState(prev => ({
          ...prev,
          currentPlayer: data.player,
          choices: data.choices,
          playersLeft: data.playersLeft,
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error fetching next player:', error);
      setGameState(prev => ({
        ...prev,
        error: 'Failed to load next player',
        loading: false
      }));
    }
  };
  
  // if (gameState.loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  // if (gameState.error) {
  //   return <div className="error">{gameState.error}</div>;
  // }

  if (gameState.gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over!</h2>
        <p>You've seen all players!</p>
        <button onClick={() => handleRestart(selectedCard)} className="restart-btn">
          Play Again
        </button>
      </div>
    );
  }

  if (!selectedCard) {
    console.log('About to render CardSelector with:', {
      availableCards,
      cardsLength: availableCards?.length,
      isArray: Array.isArray(availableCards)
    });
    return (
      <CardSelector 
        cards={availableCards} 
        onSelectCard={handleCardSelect} 
      />
    );
  }

  return (
    <div className="football-game">
      <div className="game-header">
        <div className="player-info">
          {/* <div className="player-number"></div> */}
          <div className="player-name">{gameState.currentPlayer?.name}</div>
          {/* <button className="wildcard-btn">
            Play Wildcard <span className="info-icon">ⓘ</span>
          </button> */}
        </div>
        <div className="game-controls">
          <button className="skip-btn" onClick={handleSkip}>
            SKIP ▶
          </button>
          <div className="players-left">{gameState.playersLeft} PLAYERS LEFT</div>
        </div>
      </div>

      <div className="choices-grid">
        {gameState.choices.map((choice) => (
          <div
            key={choice.id}
            className={`choice-card ${
              globalSelectedChoices.has(choice.id)
                ? choiceResults[choice.id]
                  ? 'correct selected'
                  : 'incorrect selected'
                : ''
            } ${isProcessing ? 'disabled' : ''}`}
            onClick={() => handleChoice(choice.id)}
          >
            <span className="choice-icon">{choice.icon}</span>
            <span className="choice-label">{choice.label}</span>
          </div>
        ))}
      </div>

      {/* Add Score Modal */}
      {showScoreModal && (
        <div className="score-modal-overlay">
          <div className="score-modal">
            <h2>Game Complete!</h2>
            <div className="score-details">
              <p>Correct Answers: {finalScore}</p>
              <p>Total Questions: {Object.keys(choiceResults).length}</p>
              <p>Accuracy: {((finalScore / Object.keys(choiceResults).length) * 100).toFixed(1)}%</p>
            </div>
            <button onClick={handleCloseModal}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootballGame; 