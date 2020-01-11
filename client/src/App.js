import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NoteApp from "./components/NoteApp/NoteApp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Note from "./components/Note/Note";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={NoteApp} />
      <Route exact path="/notes/:id" component={Note} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
