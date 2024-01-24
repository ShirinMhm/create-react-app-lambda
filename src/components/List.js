// List.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import './List.css'; // Import the stylesheet for List

const List = ({ list, onCardMove, onDeleteList, onEditListTitle }) => {
  const [newCardContent, setNewCardContent] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedListTitle, setEditedListTitle] = useState(list.title);
  const [showOptions, setShowOptions] = useState(false);
  const [showAddCardInput, setShowAddCardInput] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: () => ({ listId: list.id }),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleAddCard = () => {
    setShowAddCardInput(true);
  };

  const handleConfirmAddCard = () => {
    if (newCardContent.trim() !== '') {
      const newCard = { id: Date.now(), content: newCardContent };
      list.cards.push(newCard);
      setNewCardContent('');
      setShowAddCardInput(false);
    }
  };

  const handleDeleteList = () => {
    onDeleteList(list.id);
  };

  const handleEditListTitle = () => {
    onEditListTitle(list.id, editedListTitle);
    setIsEditingTitle(false);
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div ref={drop} className={`list ${isOver ? 'drag-over' : ''}`}>
      <div className="list-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedListTitle}
            onChange={(e) => setEditedListTitle(e.target.value)}
            onBlur={handleEditListTitle}
            autoFocus
          />
        ) : (
          <>
            <h3>{list.title}</h3>
            <button onClick={() => setIsEditingTitle(true)}>Edit</button>
          </>
        )}
        <div className="list-options">
          <button onClick={handleAddCard}>+</button>
          <button onClick={handleToggleOptions}>...</button>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleDeleteList}>Delete List</button>
              {/* Add more options here */}
            </div>
          )}
        </div>
      </div>
      <div className="card-list">
        {list.cards.map(card => (
          <Card key={card.id} card={card} onCardMove={onCardMove} />
        ))}
        {showAddCardInput && (
          <div className="add-card-form">
            <input
              type="text"
              placeholder="Enter card name..."
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
            />
            <button onClick={handleConfirmAddCard}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
