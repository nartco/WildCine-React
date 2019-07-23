import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import '../css/movies.css';
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        Film: state.choiceMovie.Film
    }
  }

function DisplayMovies(props) {

    function _choiceMovie(movie) {
        const action = { type: "CHOICEMOVIE", value: movie }
        return props.dispatch(action)
    }
    
    //si on envoie en props, nb alors on affiche un certain nombre de films (via slice)
    if (typeof props.nb !== 'undefined') {
        props.movies.splice((props.nb), (props.movies.length))
    }
    // on parcours le tableau et on creer un nouveau (slides)
    // Grid permet de gerer le nombre d'element a afficher sur une ligne selon le device, on dispose de 12 colonnes,
    //XS12 affiche 1 element // sm6 2 // lg4 3
    const slides = props.movies.map((item, i) => {
        return (
            <Grid item xs={12} sm={6} lg={4} key={i}>
                <div className="content">
                    <Link to="/movie" onClick={() => _choiceMovie(item.id)}>
                        <h1 className="titleM" >{item.title} </h1>
                        <img
                        style={{ width: "100%", cursor: "pointer" }}
                        src={'https://image.tmdb.org/t/p/w400/' + item.poster_path} alt={item.original_title}/>
                        {
                            props.popularity ? 
                                <div className="overlay">
                                    <div className="text">{'Popularity score: ' + item.popularity}</div>
                                </div> 
                                :
                                <div className="overlay">
                                    <div className="text">{item.release_date}</div>
                                </div> 
                        }
                    </Link> 
                </div>   
            </Grid>
            
        );
      });

    return (
        <div className='container'>
          <Grid container spacing={8}>
            {slides}
          </Grid>
        </div>

      );
}

export default connect(mapStateToProps)(DisplayMovies);