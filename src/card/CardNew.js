import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { readDeck } from "../utils/api/index";

import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";

const CardNew = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: "", back: "", id: 0 });

    // You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort();
    }, [deckId, setDeck]);

    return(
        <>
            {/* There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card). */}
            <NavBar deckName={deck.name} />
            
            {/* The screen displays the React Router: Add Card deck title. */}
            <h4>{deck.name}: Add Card</h4>

            {/* A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text. */}
            <CardForm 
                deckId={deck.id}
                card={card}
                setCard={setCard}
            />
        </>
    )
}

export default CardNew;