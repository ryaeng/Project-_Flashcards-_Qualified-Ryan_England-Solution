import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import { readDeck } from "../utils/api";

import NavBar from "../Layout/NavBar";

const Deck = ({ deck, setDeck }) => {
    const { deckId } = useParams();
    
    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort;
    }, [deckId]);

    const cardList = deck.cards.map((card) => {
        return(
            <div key={card.id}>
                <p>{card.front}</p>
                <p>{card.back}</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    });

    const history = useHistory();

    return(
        <>
            <NavBar deckName={deck.name}/>
            <main>
                <section className="container">
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <button>Edit</button>
                    <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                    <button>Add Cards</button>
                    <button>Delete</button>
                </section>
                <section className="container">
                    <h2>Cards</h2>
                        {cardList}
                </section>
            </main>
        </>
    )
}

export default Deck;