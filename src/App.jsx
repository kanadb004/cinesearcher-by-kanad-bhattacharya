import { BASE_URL } from "constants/apis";

import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { PageNotFound } from "./components/commons";
import Favourites from "./components/Favourites";
import MovieList from "./components/MovieList";

const App = () => (
  <Switch>
    <Route exact component={MovieList} path={`${BASE_URL}movies`} />
    <Route exact component={Favourites} path={`${BASE_URL}favourites`} />
    <Redirect exact from={BASE_URL} to={`${BASE_URL}movies`} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
