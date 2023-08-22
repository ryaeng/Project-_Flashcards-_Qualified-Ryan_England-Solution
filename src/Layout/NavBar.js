
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const NavBar = ({ deckName }) => {
    const { deckId, cardId } = useParams();
    const location = useLocation();
    const list = [
        <li key={0}>
            <Link to="/">Home</Link>
        </li>
    ];

    if (deckName) {
        list.push(
            <li key={deckId}>
                <Link to={`/decks/${deckId}`}>{deckName}</Link>
            </li>
        );

        if (location.pathname.indexOf(`/decks/${deckId}/study`) !== -1) {
            list.push(<li>Study</li>);
        } else if (location.pathname.indexOf(`/decks/${deckId}/edit`) !== -1) {
            list.push(<li>Edit</li>);
        } else if (location.pathname.indexOf(`/decks/${deckId}/cards/new`) !== -1) {
            list.push(<li>Add Card</li>);
        } else if (location.pathname.indexOf(`/decks/${deckId}/cards/${cardId}/edit`) !== -1) {
            list.push(<li>Edit Card {cardId}</li>)
        }
    } else if (location.pathname.indexOf("/decks/new") !== -1) {
        list.push(<li>Create Deck</li>);
    }

    return(
        <nav>
            <ol>{list}</ol>
        </nav>
    )
}

export default NavBar;