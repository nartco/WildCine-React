import React from 'react';
import { connect } from 'react-redux'
import '../css/movie.css';
import ColoredLine from './line';



const mapStateToProps = (state) => {
  return {
    Film: state.choiceMovie.Film,
    fav: state.toggleFavorite.favoritesFilm
  }
}



class movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movie: [],
      casting: [],
      crew: [],
      color: '#26C485',
      background: 'black',
      txt : '+',
      click: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.color = this.color.bind(this);
    this.goBack = this.goBack.bind(this);

    // This binding is necessary to make `this` work in the callback
  } 
  
  goBack(){
    this.props.history.goBack();
}

  handleClick() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.movie.id } //Redux => on change la valeur du state global avec l'id du film like
    this.props.dispatch(action)
    this.setState({click: true},
      () => {this.color()}) // change couleur du bouton
    setTimeout(() => this.setState({ click: false }), 2000);
    }

  color(){
    if(this.props.fav.length > 0){
      if (this.props.fav.findIndex(id => id === this.state.movie.id) !== -1) { // si le film est dans le tableau 
        return(
          this.setState({
            color: 'black',
            background: '#26C485',
            txt: '-'
          })
        )
      }
     }
     else if(!(this.props.fav.length > 0) || this.props.fav.findIndex(id => id === this.state.movie.id) === -1){
      this.setState({
        color: '#26C485',
        background: 'black',
        txt: '+'
      })
    }
    }
  componentDidMount(){
    window.scrollTo(0, 0)
    this.setState({isLoading: true, click: false})
    let indexMovie = this.props.Film
    let key = process.env.movie_key.toString()
    if(indexMovie > 0){
      fetch(`https://api.themoviedb.org/3/movie/${indexMovie}?api_key=${key}&language=en-US`)
      .then(response => response.json())
      .then(data => (this.setState({movie: data})))
      .catch(error => {
        throw(error);
    });
      fetch(`https://api.themoviedb.org/3/movie/${indexMovie}/credits?api_key=${key}&language=en-US`)
      .then(response2 => response2.json())
      .then(data2 => (this.setState({casting: data2.cast, crew: data2.crew, isLoading: false})))
      .then(() => {this.color()})
      .catch(error => {
        throw(error);
    });
    }
    
  }
  
 
  render(){
    let movie = this.state.movie
    let crew = this.state.crew
    let cast = this.state.casting
    let directors = []
    let actors = []
    let genres = []

    if(this.state.isLoading === false && this.state.movie.length !== 0){
      
      directors = crew.filter((human) => {return human.job === 'Director';}) // recup juste les directeurs 
      directors = directors.map((humanoide, i) => {
        return(
          <p key={i}>{humanoide.name}</p>
        )
      })
      actors = cast.map((humanoide, i) => {
        return(
          <div key={i}>
          <p>{humanoide.name}</p>
          <p className="char">{'(' + humanoide.character + ')'}</p>
          </div>
        )
      })
      actors = actors.splice(0,5)
      if(movie.genres !== 'undefined'){
        genres = movie.genres.map((genre, i) => {
          return(
            <div key={i}>
              <p >{genre.name}</p>
            </div>
          )
        })
      }
      
    } 
    return(
      <div className="containerM">
          <div className="posterDivM">
            {this.state.isLoading === false ? 
              <img 
                src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.original_title}
                className="posterM"/> 
              :
              null
            }
            </div>

            <div className="informationsMovie">
              <ul className="ulM">
                <li><span className="categories">Favorites</span> <br/> <span className="response"><button  disabled={this.state.click} onClick={this.handleClick}  style={{backgroundColor:this.state.background, color:this.state.color}} className="listButton" >{this.state.txt}</button></span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Title</span> <br/> <span className="response">{movie.title}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">overview</span> <br/> <span className="response">{movie.overview}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Release date</span> <br/><span className="response">{movie.release_date}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Director(s)</span> <br/> <span className="response">{directors}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Actors</span> <br/> <span className="response">{actors}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Vote</span> <br/> <span className="response">{movie.vote_average + '/ 10'}</span></li>
                <ColoredLine color="#26C485" />
                <li><span className="categories">Genres</span> <br/> <span className="response">{genres}</span></li>
                <ColoredLine color="#26C485" />
                <button className="listButton" style={{backgroundColor:'black', color:'#26C485'}} onClick={this.goBack}><h1>Return</h1></button>
              </ul>
            </div>
      </div>      
    )
  }
  
}

export default connect(mapStateToProps)(movie);