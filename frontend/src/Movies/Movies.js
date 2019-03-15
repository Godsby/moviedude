import React from 'react';
import { Route, Switch } from 'react-router-dom';
//In react, nested routing, need specify the detailed route, like '/movies' below
import AllMovies from './AllMovies';
import MoviesByGenre from './MoviesByGenre';
import SingleMovie from './SingleMovie'
import axios from 'axios';

class Movies extends React.Component {
  state = {
    moviesWithRating: [],
    moviesByGenre: [],
    genres: []
  }

  componentDidMount () {
    this.fetchMovieWithGenre();
    axios.get('/movies/ratings')
    .then(res => {
      this.setState({
        moviesWithRating: res.data.movies
      })
    })
  }

  fetchMovieWithGenre = () => {
    axios.get('/movies/genres')
    .then(res => {
      this.setState({
        moviesByGenre: res.data.movies
      })
    })
  }

  render () {
    const { moviesWithRating, moviesByGenre, genres } = this.state;
    return (
      <Switch>
        <Route 
          exact path='/movies' 
          render={() => {
            return <AllMovies moviesWithRating={moviesWithRating}/>
          }}
        />
        <Route 
          path='/movies/genres' 
          render={() => {
            return <MoviesByGenre moviesByGenre={moviesByGenre} genres={genres}/> 
          }} 
        />
        <Route 
          path='/movies/:movie_id' component={SingleMovie}/> 
        />
      </Switch>
    )
  }
}

export default Movies;