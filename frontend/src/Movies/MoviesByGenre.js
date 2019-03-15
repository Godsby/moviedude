import React from 'react';
import '../stylesheets/MoviesByGenre.css';
import { Link } from 'react-router-dom';

class MoviesByGenre extends React.Component {
  state = {
    selectedGenre: '',
    formSubmitted: false
  }

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false
    })
  }

  handleFormSumit = e => {
    e.preventDefault();
    this.setState({
      formSubmitted: true
    })
  }

  render() {
    const { moviesByGenre } = this.props;
    const { selectedGenre, formSubmitted } = this.state;

    let movieFilter = moviesByGenre;

    if ( formSubmitted && selectedGenre ) {
      movieFilter = moviesByGenre.filter(movie => {
        return movie.name === selectedGenre;
      })
    }

    let movieList = movieFilter.map((movie, i) => {
      return (
        <div className='card' key={ i + 1 }>
          <Link to={'/movies/' + movie.id}>
            <ul>
              <li>
                <img src={movie.img_url} alt=''/>
                <div>
                  <p className='card-content'>Title: {movie.title}</p>
                  <p className='card-content'>Genre Name: {movie.name}</p>
                </div>
              </li>
            </ul>
          </Link>
        </div>
      )
    })

    let genreList = movieFilter.map((movie, i) => {
      return (
        <option key={ i + 1 } value={movie.name} >
          {movie.name} 
        </option>
      )
    })

    return (
      <div className='container'>
        <form onSubmit={this.handleFormSumit}>
          <select name = "selectedGenre" onChange = {this.handleSelect} >
            <option key='0' value=''> {' '} </option>
            {genreList}
          </select>
          <button type='submit'>Submit</button>
        </form>

        <div className='movie-container'>
          { !this.props.moviesByGenre.length ? <h4>Loading...</h4> : 
            ( movieList.length ? 
              movieList : <h4> No such a movie was found!</h4> )
          }
        </div>
      </div>
    )
  }
}

export default MoviesByGenre;