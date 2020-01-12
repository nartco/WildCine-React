import React from 'react';
import DisplayMovies from './displayMovies';
import '../css/listingM.css';
import ColoredLine from './line';
import Spinner from 'react-bootstrap/Spinner'

export default class ListingM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Allmovies: [],
      index : 1,
      next: false,
      prev: false,
      isLoading: false,
    };
    this.movies = this.movies.bind(this);
    // This binding is necessary to make `this` work in the callback

  }
 
  componentDidMount(){
    this.movies()
    this.setState({isLoading: false})
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
    
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.movieKey}&language=en-US&page=${this.state.index}`)
    .then(response => response.json())
    .then(data => {(this.setState({Allmovies: data.results.slice(0,18), isLoading: false}))});
  }

  render(){
    let movies = {
      movies: this.state.Allmovies,
    }
    return(
      <div>
          <h1>upcoming movies</h1>
          <ColoredLine color="#26C485" />
          {this.state.isLoading === true && <div className="spiner"><Spinner animation="border" /></div>}
           <DisplayMovies {... movies} /> {/*  on passe en props le tableau de films a display */}
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
