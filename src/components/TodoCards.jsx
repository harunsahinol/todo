/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import axios from "axios";

function TodoCards({ cards, onDelete, onToggleDone }) {
  const [updatedCards, setUpdatedCards] = useState(cards);

  useEffect(() => {
    setUpdatedCards(cards);
  }, [cards]);

  const handleDelete = async (id) => {
    onDelete(id);
  };

  const handleToggleDone = async (id, is_done) => {
    onToggleDone(id, is_done);
  };

  const handleKeyDown = async (event, id, index) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent creating a new line
      const newText = event.target.textContent.trim(); // Get the edited text
      await handleTextSave(id, newText, index);
      event.target.blur();
    }
  };

  const handleTextSave = async (id, newText, index) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todos/update/description/${id}/`,
        {
          description: newText,
        }
      );
      if (!response.data) {
        throw new Error("Failed to update text");
      }
      const updatedCard = response.data;
      setUpdatedCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index] = updatedCard; // Replace the updated card in the array
        return newCards;
      });
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  return (
    <Box>
      <div className="grid grid-cols-4 gap-10 max-[1080px]:grid-cols-2">
        {updatedCards.map((card, index) => (
          <Card
            key={card.id}
            className=" mt-8 mb-2 "
            style={{
              width: "200px",
              height: "150px",
              boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
              background:
                card.id % 2 === 0
                  ? "#b8e6b8"
                  : card.id % 3 === 0
                  ? "#b8b8e6"
                  : "#ffffcc",
              transform:
                card.id % 2 === 0
                  ? "rotate(4deg)"
                  : card.id % 3 === 0
                  ? "rotate(-3deg)"
                  : card.id % 5 === 0
                  ? "rotate(5deg)"
                  : "rotate(-6deg)",
              top:
                card.id % 2 === 0
                  ? "5px"
                  : card.id % 3 === 0
                  ? "-5px"
                  : card.id % 5 === 0
                  ? "-10px"
                  : "0px",
              cursor: "text",
              padding: "10px",
            }}
          >
            <div className="flex items-center justify-between">
              <Checkbox
                color="success"
                checked={card.is_done}
                onChange={() => handleToggleDone(card.id, card.is_done)}
              />
              <button onClick={() => handleDelete(card.id)}>❌</button>
            </div>
            <CardContent>
              <Typography
                level="title-lg"
                textColor="inherit"
                align="center"
                style={{
                  textDecoration: card.is_done ? "line-through" : "none",
                }}
                contentEditable={!card.is_done}
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextSave(card.id, e.target.textContent.trim(), index)
                }
                onKeyDown={(e) => handleKeyDown(e, card.id, index)}
              >
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}

export default TodoCards;
