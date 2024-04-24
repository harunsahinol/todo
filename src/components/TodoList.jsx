import axios from 'axios';
import { useState, useEffect } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import TodoCards from './TodoCards';

function TodoList() {
  const [inputText, setInputText] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get('http://localhost:8000/api/todos/get/')
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleAddCard = () => {
    if (inputText.trim() !== '') {
      const newCard = {
        description: inputText,
        is_done: false,
      };
      axios
        .post('http://localhost:8000/api/todos/post/', newCard)
        .then((response) => {
          const addedCard = response.data;
          setCards([...cards, addedCard]);
          setInputText('');
        })
        .catch((error) => console.error('Error adding card:', error));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCard(e);
    }
  };

  const handleDeleteCard = (id) => {
    axios
      .delete(`http://localhost:8000/api/todos/delete/${id}/`)
      .then(() => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
      })
      .catch((error) => console.error('Error deleting card:', error));
  };

  const handleToggleDone = (id, is_done) => {
    axios
      .patch(`http://localhost:8000/api/todos/update/done/${id}/`, {
        is_done: !is_done,
      })
      .then(() => {
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, is_done: !is_done } : card
        );
        setCards(updatedCards);
      })
      .catch((error) => console.error('Error toggling done status:', error));
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-8">
        <Input
          className="w-96 mr-2 px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="What do you want to do?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          onClick={handleAddCard}
          style={{
            backgroundColor: '#092635',
            fontSize: '15px',
            padding: '12px 24px',
          }}
        >
          Add
        </Button>
      </div>
      <TodoCards
        cards={cards.filter((card) => !card.is_done)}
        onDelete={handleDeleteCard}
        onToggleDone={handleToggleDone}
      />
    </div>
  );
}

export default TodoList;
