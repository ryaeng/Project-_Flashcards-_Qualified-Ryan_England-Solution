import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";

import CardNew from "../card/CardNew";
import CardEdit from "../card/CardEdit";

import Deck from "../deck/Deck";
import DeckEdit from "../deck/DeckEdit";
import DeckList from "../deck/DeckList";
import DeckNew from "../deck/DeckNew";
import DeckStudy from "../deck/DeckStudy";

function Layout() {
  const [cardForm, setCardForm] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({ cards: [{ id: 0 }] });
  const [deckForm, setDeckForm] = useState({ name: "", description: "" });

  const history = useHistory();

  const handleFormChange = (event, form, setForm) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <button onClick={() => {history.push("/decks/new")}}>Crete Deck</button>
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <DeckNew />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit 
              deck={deck} 
              setDeck={setDeck} 
              form={cardForm} 
              setForm={setCardForm} 
              handleFormChange={handleFormChange} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardNew 
              deck={deck} 
              setDeck={setDeck} 
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy 
              deck={deck} 
              setDeck={setDeck} 
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit 
              form={deckForm} 
              setForm={setDeckForm} 
              handleFormChange={handleFormChange} 
            />
          </Route>
          <Route path="/decks/:deckId">
            <Deck 
              deck={deck} 
              setDeck={setDeck} 
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
