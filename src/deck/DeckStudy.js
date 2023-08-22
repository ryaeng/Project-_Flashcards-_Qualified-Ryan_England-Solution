import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { readDeck } from "../utils/api/index";

import NavBar from "../Layout/NavBar";

const DeckStudy = ({ deck, setDeck }) => {
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort();
    }, [deckId]);

    let [count, setCount] = useState(0);
    let [flipped, setFlipped] = useState(false);

    const flipClickHandler = () => {
        setFlipped(!flipped);
    }

    const history = useHistory();

    const nextClickHandler = () => {
        if (count < deck.cards.length) {
            setCount((currentCount) => currentCount + 1);
        } else {
            if (window.confirm("Restart cards?") === true) {
                setCount("0");
            } else {
                history.push("/");
            }
        }
    }

    return(
        <>
            <NavBar deckName={deck.name}/>
            <h2>Study: {deck.name}</h2>
            <div className="container">
                { deck.cards.length < 3 ? 
                    <div className="container">
                        <h4>Not enough cards</h4>
                        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in the deck</p>
                    </div>
                : 
                    <div>
                        <h4>Card {count + 1} of {deck.cards.length}</h4>
                        <p>
                            { !flipped ? deck.cards[count].front : deck.cards[count].back }
                        </p>
                        <button onClick={() => flipClickHandler()}>
                            Flip
                        </button>
                        { flipped && 
                            <button onClick={() => nextClickHandler()}>
                                Next
                            </button> 
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default DeckStudy;