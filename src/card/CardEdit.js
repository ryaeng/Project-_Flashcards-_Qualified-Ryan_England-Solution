import React, { useEffect, useState } from "react";

import { readCard, readDeck } from "../utils/api/index";
import { useParams } from "react-router-dom";

import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";

const CardEdit = ({ deck, setDeck }) => {
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({ front: "", back: "", id: 0 });

    /* 
        You must use the readDeck() function from src/utils/api/index.js to load 
          the deck that contains the card to be edited. Additionally, you must use 
          the readCard() function from src/utils/api/index.js to load the card 
          that you want to edit.
    */
    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck);

        readCard(cardId, abortController.signal).then(setCard);
        
        return () => abortController.abort();
    }, [cardId, deckId, setDeck]);

    return(
        <>
            {/* 
                There is a breadcrumb navigation bar with a link to home /, 
                  followed by the name of the deck of which the edited card is a 
                  member, and finally the text Edit Card :cardId (e.g., Home/Deck 
                  React Router/Edit Card 4). 
            */}
            <NavBar deckName={deck.name} />

            {/* 
                It displays the same form as the Add Card screen, except it is 
                  prefilled with information for the existing card. It can be 
                  edited and updated. 
            */}
            <CardForm 
                deckId={deckId}
                card={card}
                setCard={setCard}
            />
        </>
    )
}

export default CardEdit;