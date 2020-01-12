import React from 'react';
import '../css/home.css';
import 'bootstrap/dist/css/bootstrap.css';
import CarouselM from './Carousel';
import ColoredLine from './line';
import DisplayMovies from './displayMovies';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingMovies: [],
      popularMovies: [],
      isLoading: false,
      width: 0,
    };
    this.upComing = this.upComing.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    // This binding is necessary to make `this` work in the callback
  }

  componentDidMount(){
    window.scrollTo(0, 0)
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.upComing();
    this.setState({isLoading: false})
    }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  upComing(){
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.movieKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => (this.setState({upcomingMovies: data.results})));
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.movieKey}&language=en-US&page=1`)
    .then(response2 => response2.json())
    .then(data2 => (this.setState({popularMovies: data2.results})))
    .then(() => {
      if(this.state.width < 1280 && this.state.width > 600){
      this.setState({popularMovies: this.state.popularMovies.slice(5,9), upcomingMovies: this.state.upcomingMovies.slice(0,4)})
    }
      else{
        this.setState({popularMovies: this.state.popularMovies.slice(4,7), upcomingMovies: this.state.upcomingMovies.slice(0,3)})
      }
    });
  }

  render(){
      let movies = {
        movies: this.state.upcomingMovies,
        popularity: false
      }
      let movies2 = {
        movies: this.state.popularMovies,
        popularity: true
      }
      
      return (
        <div className="App" >
          <h1 className="TitleTT TopRated">Top Rated</h1>
          <ColoredLine color="#26C485" />
          <CarouselM />
          <h1 className="TitleTT">Upcoming Movies</h1>
          <ColoredLine color="#26C485" />
          <DisplayMovies {... movies}/>
          <h1 className="TitleTT">popular Movies</h1>
          <ColoredLine color="#26C485" />
          <DisplayMovies {... movies2}/>
        </div>
    );
  }
  
}
