import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import TodoCards from './TodoCards';

function CompletedTodo() {
  const [completedCards, setCompletedCards] = useState([]);

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = () => {
    axios
      .get('http://localhost:8000/api/todos/get/')
      .then((response) => {
        setCompletedCards(response.data.filter((card) => card.is_done));
      })
      .catch((error) =>
        console.error('Error fetching completed todos:', error)
      );
  };

  const handleDeleteCompletedCard = (id) => {
    axios
      .delete(`http://localhost:8000/api/todos/delete/${id}/`)
      .then(() => {
        setCompletedCards(completedCards.filter((card) => card.id !== id));
      })
      .catch((error) => console.error('Error deleting completed card:', error));
  };

  const handleToggleDoneCompleted = (id, is_done) => {
    axios
      .patch(`http://localhost:8000/api/todos/update/done/${id}/`, {
        is_done: !is_done,
      })
      .then(() => {
        const updatedCompletedCards = completedCards.map((card) =>
          card.id === id ? { ...card, is_done: !is_done } : card
        );
        setCompletedCards(updatedCompletedCards);
      })
      .catch((error) =>
        console.error('Error toggling done status for completed card:', error)
      );
  };

  const handleClearAll = () => {
    axios
      .delete('http://localhost:8000/api/todos/delete/all')
      .then(() => {
        setCompletedCards([]);
      })
      .catch((error) =>
        console.error('Error clearing all completed cards:', error)
      );
  };

  return (
    <div>
      <TodoCards
        cards={completedCards.filter(
          (completedCards) => completedCards.is_done
        )}
        onDelete={handleDeleteCompletedCard}
        onToggleDone={handleToggleDoneCompleted}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
      >
        <Button
          onClick={handleClearAll}
          style={{
            backgroundColor: '#092635',
            fontSize: '15px',
            padding: '12px 24px',
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}

export default CompletedTodo;
