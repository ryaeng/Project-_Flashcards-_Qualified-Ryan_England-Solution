import React from "react";
import { useHistory } from "react-router-dom";

import { createCard, updateCard } from "../utils/api/index";

const CardForm = ({ deckId, card, setCard }) => {
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setCard({ ...card, [name]: value });
    };

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        console.log(card);
        
        if (card.id === 0) {
            createCard(deckId, card, abortController.signal);
            setCard({ front: "", back: "", id: 0 });
        } else {
            updateCard(card, abortController.signal).then(() => {
                history.push(`/decks/${deckId}`);
            });
        }
        
        return () => abortController.abort();
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Front</label>
                <textarea 
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    onChange={handleFormChange}
                    value={card.front}
                />
            </div>
            <div>
                <label>Back</label>
                <textarea 
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    onChange={handleFormChange}
                    value={card.back}
                />
            </div>
            {/* If the user clicks Done, the user is taken to the Deck screen. */}
            <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>
                Cancel
            </button>
            <button type="submit">Save</button>
        </form>
    )
}

export default CardForm;