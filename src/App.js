import React from 'react';
import './App.css';
import Home from './components/Home';
import { Switch, Route, withRouter} from 'react-router-dom';
import UpcomingMovies from './components/UpcomingMovies';
import Movie from './components/MovieDetails';
import DiscoverMovies from './components/DiscoverMovies';
import SearchPage from './components/searchPage';
import Loading from './components/RedirectSearch';
import Favorite from './components/Favorite'

//dans la fonction root on regle les chemins pour que l'user soit redirige au bonne endroit quand il clique sur un lien interne 
function App(){
    return(
        <main className="mainContent">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/upcoming" component={UpcomingMovies} />
                <Route path="/movie" component={Movie} />
                <Route path="/discover" component={DiscoverMovies} />
                <Route path="/Search" component={SearchPage} />
                <Route path="/loading" component={Loading} />
                <Route path="/favorite" component={Favorite} />
            </Switch>
        </main>
    );
}

export default withRouter(App)