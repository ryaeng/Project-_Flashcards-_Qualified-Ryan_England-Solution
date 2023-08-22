import React from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../utils/api";

import NavBar from "../Layout/NavBar";

const DeckNew = ({ form, setForm, handleFormChange }) => {
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        
        createDeck(form, abortController.signal).then(({ id }) => {
            history.push(`/decks/${id}`)
        });

        return () => abortController.abort();
    };

    return(
        <>
            <NavBar/>
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
                <button onClick={() => history.push("/")}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default DeckNew;