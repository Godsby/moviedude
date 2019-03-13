import React from 'react';

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
    const { movies, genres } = this.props;
    const { selectedGenre, formSubmitted } = this.state;

    let movieFilter = movies;

    if ( formSubmitted && selectedGenre ) {
      movieFilter = movies.filter(movie => {
        return movie.genre === selectedGenre;
      })
    }

    let movieList = movieFilter.map(movie => {
      return (
      <li key={movie.id}>{movie.title}</li>
      )
    })

    let genreList = genres.map((genre, i) => {
      return (
        <option key={ i + 1 } value={genre} >
          {genre} 
        </option>
      )
    })

    return (
      <>
        <h1>By Genre</h1>

        <form onSubmit={this.handleFormSumit}>
          <select name = "selectedGenre" onChange = {this.handleSelect} >
            <option key='0' value=''> {' '} </option>
            {genreList}
          </select>
          <button type='submit'>Submit</button>
        </form>

        <ul>{movieList}</ul>
      </>
    )
  }
}

export default MoviesByGenre;