import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ card, onCardMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onCardMove(item.id, dropResult.listId);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      <p>{card.content}</p>
    </div>
  );
};

export default Card;
