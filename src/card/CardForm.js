import React from "react";
import { useLocation } from "react-router-dom";

const CardForm = ({ form, handleFormChange, handleSubmit }) => {
    const location = useLocation();

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Front</label>
                <textarea 
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    onChange={handleFormChange}
                    value={form.front}
                />
            </div>
            <div>
                <label>Back</label>
                <textarea 
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    onChange={handleFormChange}
                    value={form.back}
                />
            </div>
            {/* If the user clicks Done, the user is taken to the Deck screen. */}
            <button onClick={() => history.push(`/decks/${deckId}`)}>
                { location.pathname.indexOf("/edit") > -1 ? "Cancel" : "Done" }
            </button>
            <button type="submit">Save</button>
        </form>
    )
}

export default CardForm;