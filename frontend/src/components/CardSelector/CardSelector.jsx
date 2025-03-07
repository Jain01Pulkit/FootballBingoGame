import React from 'react';
import './CardSelector.css';

const CardSelector = ({ cards, onSelectCard }) => {
  console.log('CardSelector component rendering with:', {
    cards,
    cardsLength: cards?.length,
    isArray: Array.isArray(cards)
  });

  if (!Array.isArray(cards)) {
    console.log('Cards is not an array:', cards);
    return (
      <div className="card-selector">
        <h2>Loading cards...</h2>
      </div>
    );
  }

  if (cards.length === 0) {
    console.log('Cards array is empty');
    return (
      <div className="card-selector">
        <h2>Loading cards...</h2>
      </div>
    );
  }

  return (
    <div className="card-selector">
      <h2>Select a Bingo Card</h2>
      <div className="cards-grid">
        {cards.map(card => {
          console.log('Rendering card:', card);
          return (
            <div 
              key={card.id} 
              className="card-option"
              onClick={() => {
                console.log('Card clicked:', card.id);
                onSelectCard(card.id);
              }}
            >
              <h3>{card.name}</h3>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSelector; 