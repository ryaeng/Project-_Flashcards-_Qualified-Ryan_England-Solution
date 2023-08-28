import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { deleteDeck, listDecks } from "../utils/api/index";

export const DeckList = () => {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
  
        listDecks(abortController.signal).then(setDecks);
  
        return () => abortController.abort;
    }, [setDecks]);

    const deleteDeckHandler = (deckId) => {
        const abortController = new AbortController();

        if (window.confirm("Delete this deck?")) {
            deleteDeck(deckId, abortController.signal);
            setDecks(decks.filter((deck) => deck.id !== deckId));
        }
    }

    const list = decks.map((deck) => {
        return (
            <div className="container" key={deck.id}>
                <h3>{deck.name}</h3>
                <h4>{deck.cards.length} cards</h4>
                <p>{deck.description}</p>
                <button onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                <button onClick={() => deleteDeckHandler(deck.id)}>Delete</button>
            </div>
        );
    })

    return (
        <main className="container">
            <section>{list}</section>
        </main>
    )
}

export default DeckList;