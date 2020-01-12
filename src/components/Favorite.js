import React from 'react';
import DisplayMovies from './displayMovies';
import '../css/listingM.css';
import ColoredLine from './line';
import Spinner from 'react-bootstrap/Spinner'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        fav: state.toggleFavorite.favoritesFilm
    }
  }

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Allmovies: [],
      index : 1,
      next: false,
      prev: false,
      isLoading: false,
      key: 0
    };
    this.movies = this.movies.bind(this);
    // This binding is necessary to make `this` work in the callback

  }
 
  componentDidMount(){
    this.movies()
    this.setState({isLoading: false})
}
  
  movies(){
    this.setState({isLoading: true})
    window.scrollTo(0, 0)
    let indexMovie = this.props.fav
    let key = toString(process.env.movie_key)
    indexMovie.map((indexMovie) => { //pour chaque element du tableau, je fais appel a l'api pour obtenir les infos du film
        return(
          fetch(`https://api.themoviedb.org/3/movie/${indexMovie}?api_key=${key}&language=en-US`)
          .then(response => response.json())
          .then(data => {
              if(this.state.Allmovies.length > 0){
                  this.setState({Allmovies: [...this.state.Allmovies, data], isLoading: false})
              }
              else{
                  this.setState({Allmovies: [data], isLoading: false})
              }
        })
        )
    })
    
  }

  render(){
    let movies = {
      movies: this.state.Allmovies,
    }
    return(
      <div>
          <h1 onChange={() => this.movies()}>Favorites</h1>
          <ColoredLine color="#26C485" />
          {this.state.isLoading === true && <div className="spiner"><Spinner animation="border" /></div>}
          {this.state.Allmovies.length === 0 ? <h1>Your list is empty</h1> : <DisplayMovies {... movies} />} {/*  on passe en props le tableau de films a display */}
          <div className="buttonGroup">
        </div>
      </div>      
    )
  }
}

export default withRouter(connect(mapStateToProps) (SearchPage));