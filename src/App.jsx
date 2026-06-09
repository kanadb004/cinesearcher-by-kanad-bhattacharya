import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { PageNotFound } from "./components/commons";
import MovieList from "./components/MovieList";

const App = () => (
  <Switch>
    <Route exact component={MovieList} path="/movies" />
    <Redirect exact from="/" to="/movies" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
