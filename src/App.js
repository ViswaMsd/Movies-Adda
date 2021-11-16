import Layout from "./components/Layout";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Trending from "./components/Trending/index.jsx";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import Search from "./components/Search";
import SearchDetails from "./components/SearchDetails";
import NewMovies from "./components/NewMovies";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/trending" />} />
        <Route path="/trending" component={Trending} />
        <Route path="/new" component={NewMovies} />
        <Route path="/movies" component={Movies} />
        <Route path="/tv-shows" component={TVShows} />
        <Route path="/search" exact component={Search} />
        <Route path="/search/:id/:category" component={SearchDetails} />
      </Switch>
    </Layout>
  );
}

export default App;
