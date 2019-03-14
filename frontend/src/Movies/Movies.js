import React from 'react';
import { Route, Switch } from 'react-router-dom';
//In react, nested routing, need specify the detailed route, like '/movies' below
import AllMovies from './AllMovies';
import MoviesByGenre from './MoviesByGenre';
import SingleMovie from './SingleMovie'
import axios from 'axios';

class Movies extends React.Component {
  state = {
    movies: [],
    genres: ["Fantasy", "Action", "Comedy"]
  }

  componentDidMount () {
    axios.get('/movies/ratings')
    .then(res => {
      this.setState({
        movies: res.data.movies
      })
    })
  }

  render () {
    const { movies, genres } = this.state;
    return (
      <Switch>
        <Route 
          exact path='/movies' 
          render={() => {
            return <AllMovies movies={movies}/>
          }}
        />
        <Route 
          path='/movies/bygenre' 
          render={() => {
            return <MoviesByGenre movies={movies} genres={genres}/> 
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