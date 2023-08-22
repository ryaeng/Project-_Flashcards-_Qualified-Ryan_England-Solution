import React, { useEffect } from "react";

import { readCard, readDeck } from "../utils/api/index";
import { useHistory, useParams } from "react-router-dom";

import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";

const CardEdit = ({ deck, setDeck, form, setForm, handleFormChange }) => {
    const { deckId, cardId } = useParams();

    /* 
        You must use the readDeck() function from src/utils/api/index.js to load 
          the deck that contains the card to be edited. Additionally, you must use 
          the readCard() function from src/utils/api/index.js to load the card 
          that you want to edit.
    */
    useEffect(() => {
        const abortController = new AbortController;

        readDeck(deckId, abortController.signal).then(setDeck);

        readCard(cardId, abortController.signal).then(setForm);
        
        return () => abortController.abort();
    }, []);

    /*
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    */

    const history = useHistory();

    /* If the user clicks on either Save or Cancel, the user is taken to the Deck screen. */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        
        updateCard(form, abortController.signal).then(() => {
            history.push(`/decks/${deckId}`);
        });

        return () => abortController.abort();
    };

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
            <CardForm form={form} 
                handleFormChange={handleFormChange} 
                handleSubmit={handleSubmit} 
            />
        </>
    )
}

export default CardEdit;