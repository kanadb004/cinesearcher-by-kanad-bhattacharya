import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { PageNotFound } from "./components/commons";
import Favourites from "./components/Favourites";
import MovieList from "./components/MovieList";

const App = () => (
  <Switch>
    <Route exact component={MovieList} path="/movies" />
    <Route exact component={Favourites} path="/favourites" />
    <Redirect exact from="/" to="/movies" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
