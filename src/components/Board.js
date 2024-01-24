import React, { useState } from 'react';
import List from './List';
import './Board.css'; // Import a separate CSS file for styling

const Board = () => {
  const [lists, setLists] = useState([]);

  const [newListTitle, setNewListTitle] = useState('');

  const handleAddList = () => {
    const newList = { id: Date.now(), title: newListTitle, cards: [] };
    setLists([...lists, newList]);
    setNewListTitle('');
  };

  const handleCardMove = (cardId, newListId) => {
    const sourceList = lists.find(list => list.cards.some(card => card.id === cardId));
    const sourceCard = sourceList.cards.find(card => card.id === cardId);

    sourceList.cards = sourceList.cards.filter(card => card.id !== cardId);

    const destinationList = lists.find(list => list.id === newListId);

    destinationList.cards.push(sourceCard);

    setLists([...lists]);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
  };

  const handleEditListTitle = (listId, newTitle) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
  };

  return (
    <div className="board-container">
      <h2>Trello Board</h2>
      <div className="board">
        {lists.map(list => (
          <List
            key={list.id}
            list={list}
            onCardMove={handleCardMove}
            onDeleteList={handleDeleteList}
            onEditListTitle={handleEditListTitle}
          />
        ))}
        <div className="add-list-form">
          <input
            type="text"
            placeholder="Add a new list..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button onClick={handleAddList}>Add List</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
