import React from 'react';
import DisplayMovies from './displayMovies';
import '../css/listingM.css';
import ColoredLine from './line';
import Spinner from 'react-bootstrap/Spinner'

export default class RandomM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Allmovies: [],
      index : 1,
      next: false,
      prev: false,
      isLoading: false,
      genre: 0,
      criteria: 0,
      choiceIndex: 0
    };
    this.movies = this.movies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // This binding is necessary to make `this` work in the callback

  }
 
  componentDidMount(){
    this.movies()
    this.setState({isLoading: false})
}

  handleChange(e){
    let value = e.target.value; //recupere valeur du select
    this.setState({criteria: e.target.value}) 
    if (isNaN(e.target.value)){ //si la valeur n'est pas un nombre alors critere == langue (voir api)
      this.setState({choiceIndex: 2, index: 1}, //choice index fait varier l'appel a l'api dans this.movies(), index a 1 pour revenir a la premiere page
        () => {this.movies(value, 2)})
    }
    else{
      this.setState({choiceIndex: 1, index: 1}, 
        () => {this.movies(value, 1)})
    }
    
    
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
  let x = this.state.criteria
  let y = this.state.choiceIndex

  if(choice === 1){
    this.setState({index: this.state.index + 1}, // pour aller a la page suivante 
      () => {this.movies(x, y)}) // pour garder les criteres de selection
  }
  else if (choice === 0 && this.state.index > 1){
    this.setState({index: this.state.index - 1},
      () => {this.movies(x, y)})
  }   
    }

  movies(choice = 0, choiceIndex){
    this.setState({isLoading: true})
    window.scrollTo(0, 0)
    switch (choiceIndex) {
      case 2: // selon param choicIndex -> 2 = critere langue 
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.index}&with_original_language=${choice}`)
        .then(response => response.json())
        .then(data => {(this.setState({Allmovies: data.results.slice(0,18), isLoading: false}))})
        break;
      case 1: // 1 => genre
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&include_adult=false&include_video=false&page=${this.state.index}&with_genres=${choice}`)
        .then(response => response.json())
        .then(data => {(this.setState({Allmovies: data.results.slice(0,18), isLoading: false}))})
        break;
    
      default:
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&include_adult=false&include_video=false&page=${this.state.index}`)
        .then(response => response.json())
        .then(data => {(this.setState({Allmovies: data.results.slice(0,18), isLoading: false}))});
        break;
    }
    
    
  }

  render(){
    let movies = {
      movies: this.state.Allmovies,
    }
    return(
      <div>
          <h1>Discover</h1>
          <div className="selectCriteria">
          <select onChange = {this.handleChange} >
            <option value="">select criteria</option>
            <option value="">---Genres--- </option>
            <option value="35">Comedy</option>
            <option value="16">Animated</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="36">History</option>
            <option value="10749">Romance</option>
            <option value="878">Sci fi</option>
            <option value="27">Horror</option>
            <option value="53">Thriller</option>
            <option value="12">Adventure</option>
            <option value="">---Language--- </option>
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="ja">Japanese</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>     
          </select>
          </div>

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
