import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import { readDeck } from "../utils/api/index";

import NavBar from "../Layout/NavBar";

const DeckEdit = ({ form, setForm, handleFormChange }) => {
    const { deckId } = useParams();

    // You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setForm);

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        
        updateDeck(form, abortController.signal)

        return () => abortController.abort();
    };

    const history = useHistory();

    return(
        <>
            {/* There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck). */}
            <NavBar deckName={form.name} />

            {/* It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck. */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        <label>Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Deck Name" 
                            onChange={handleFormChange}
                            value={form.name}
                        />
                    </div>
                </fieldset>
                <div>
                    <label>Description</label>
                    <textarea 
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                        onChange={handleFormChange}
                        value={form.description}
                    />
                </div>
                {/* If the user clicks Cancel, the user is taken to the Deck screen. */}
                <button onClick={() => history.push("/")}>Cancel</button>
                {/* The user can edit and update the form. */}
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default DeckEdit;