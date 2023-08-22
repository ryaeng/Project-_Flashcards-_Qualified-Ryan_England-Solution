import React from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const DeckList = ({ decks }) => {
    const history = useHistory();

    const list = decks.map((deck) => {
        return (
            <div className="container" key={deck.id}>
                <h3>{deck.name}</h3>
                <h4>{deck.cards.length} cards</h4>
                <p>{deck.description}</p>
                <button onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                <button>Delete</button>
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