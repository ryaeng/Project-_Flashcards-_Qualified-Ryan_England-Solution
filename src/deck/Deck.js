import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import { deleteCard, deleteDeck, readDeck } from "../utils/api";

import NavBar from "../Layout/NavBar";

const Deck = ({ deck, setDeck }) => {
    const { deckId } = useParams();
    
    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort;
    }, [deckId, setDeck]);

    const deleteCardHandler = (cardId) => {
        const abortController = new AbortController();
        
        if (window.confirm("Delete this card")) {
            deleteCard(cardId, abortController.signal);
            readDeck(deckId, abortController.signal).then(setDeck);
        }
    }

    const cardList = deck.cards.map((card) => {
        return(
            <div key={card.id}>
                <p>{card.front}</p>
                <p>{card.back}</p>
                <button onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>Edit</button>
                <button onClick={() => deleteCardHandler(card.id)}>Delete</button>
            </div>
        )
    });

    const history = useHistory();

    const deleteDeckHandler = () => {
        const abortController = new AbortController();

        if (window.confirm("Delete this deck?")) {
            deleteDeck(deckId, abortController.signal);
            history.push("/");
        }
    }

    return(
        <>
            <NavBar deckName={deck.name}/>
            <main>
                <section className="container">
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <button onClick={() => history.push(`/decks/${deck.id}/edit`)}>Edit</button>
                    <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                    <button onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>Add Cards</button>
                    <button onClick={deleteDeckHandler}>Delete</button>
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