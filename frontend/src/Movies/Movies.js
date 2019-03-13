import React from 'react';
import { Route, Switch } from 'react-router-dom';
//In react, nested routing, need specify the detailed route, like '/movies' below
import AllMovies from './AllMovies';
import MoviesByGenre from './MoviesByGenre';
import SingleMovie from './SingleMovie'
import axios from 'axios';
import '../stylesheets/Movie.css';

class Movies extends React.Component {
  state = {
    movies: [
      { id: 1, title: "Harry Potter", genre: "Fantasy" },
      { id: 2, title: "Face Off", genre: "Action" },
      { id: 3, title: "Zoolander", genre: "Comedy" },
      { id: 4, title: "Top Gun", genre: "Action" }
    ],
    genres: ["Fantasy", "Action", "Comedy"]
  }

  componentDidMount () {
    axios.get('/movies/ratings')
    .then(res => {
        const movieArr = res.data.movies
        this.setState({
          movies: movieArr
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
          path='/movies/:id' 
          render={() => {
            return <SingleMovie movies={movies}/> 
          }} 
        />
      </Switch>
    )
  }
}

export default Movies;