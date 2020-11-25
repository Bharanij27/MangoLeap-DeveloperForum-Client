import React from "react";
import "./App.css";
import Form from "./components/Form/Form";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Forum from "./components/Forum/Forum";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import ViewQuestion from "./components/ViewQuestion/ViewQuestion";

function App() {
  return (
    <CookiesProvider>
    <Router>
      <Route path="/" exact component={Form} />
      <Route path="/forum" component={Forum} />
      <Route path="/ask" component={AskQuestion} />
      <Route path="/question" component={ViewQuestion} />
    </Router>
  </CookiesProvider>
  );
}

export default App;
