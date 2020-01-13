import React from 'react';
import DisplayMovies from './displayMovies';
import '../css/listingM.css';
import ColoredLine from './line';
import Spinner from 'react-bootstrap/Spinner'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        Search: state.SearchM.SearchM
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
    this.noResults= this.noResults.bind(this);

    // This binding is necessary to make `this` work in the callback

  }
 
  componentDidMount(){
    this.movies()
}
// PrevNext() pour de changer de page 
  prevNext(choice){     
//on change l'etat de next et prev a true pour indiquer qu'ils ont etaient clique afin qu'ils soient desactives 
    this.setState({
      next: true,
      prev: true
    }) 
// apres 2sec on les remets sur false pour reactiver
    setTimeout(() => this.setState({ next: false, prev: false }), 2000); 
// si l'element passe en parametre = on incremente l'index afin d'obtenir une nouvelle liste de film, sinon on decremente
//pour revenir a l'ancienne liste puis on appel la fonction movies afin de refaire appel a l'api
    if(choice === 1){
      this.setState({index: this.state.index + 1},
        () => {this.movies()})
    }
    else if (choice === 0 && this.state.index > 1){
      this.setState({index: this.state.index - 1},
        () => {this.movies()})
    }
  }
  
  movies(){
    this.setState({isLoading: true})
    window.scrollTo(0, 0)
    let search = this.props.Search // on recup le state global avec la valeur de recherche
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${search}&page=${this.state.index}&include_adult=false`)
    .then(response => response.json())
    .then(data => {(this.setState({Allmovies: data.results.slice(0,18), isLoading: false}))});
  }
  noResults(){
    if(this.state.isLoading === false && this.state.Allmovies.length === 0){
      return(<h1>No results</h1>)
    }
  }

  render(){
    let movies = {
      movies: this.state.Allmovies,
    }
    return(
      <div>
          <h1 onChange={() => this.movies()}>{unescape(this.props.Search)}</h1>
          <ColoredLine color="#26C485" />
          {this.state.isLoading === true && <div className="spiner"><Spinner animation="border" /></div>}
          {this.state.Allmovies.length === 0 ? this.noResults() : <DisplayMovies {... movies} />} {/*  on passe en props le tableau de films a display */}
          <div className="buttonGroup">
            {/* Disabled: si la valeur de prev/next = true alors on desactive et inversement  */}
            <button className="NextPrev" onClick={() => this.prevNext(0)} disabled={this.state.prev}>Prev</button>
            <button className="NextPrev" >{this.state.index}</button>
            <button className="NextPrev" onClick={() => this.prevNext(1)} disabled={this.state.next}>Next</button>
          </div>
      </div>      
    )
  }
}

export default withRouter(connect(mapStateToProps) (SearchPage));