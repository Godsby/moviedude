import React from 'react';
import '../stylesheets/AllMovies.css';
import { Link } from 'react-router-dom';

class AllMovies extends React.Component {
  state = {
    titleInput: '',
    formSubmitted: false
  }

  handleChange = e => {
    this.setState({
      titleInput: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.handleFound();
    this.setState({
      formSubmitted: true,
      titleInput: ''
    })
  }

  handleFound () {
    const { titleInput } = this.state;
    const { movies } = this.props;

    let movieFilter = movies.filter(movie => {
      return movie.title.includes(titleInput);
    })

    this.setState({
      movieFilter: movieFilter
    })
  }

  render () {
    const { movieFilter, titleInput, formSubmitted } = this.state;
    const { movies } = this.props;

    let movieArr = !formSubmitted ? movies : movieFilter;

    let movieList = movieArr.map(movie => {
      let movieRating = parseFloat(movie.avg).toFixed(2);
      return (
        <div className='card' key={movie.id}>
          <Link to={'/movies/' + movie.id}>
            <ul>
              <li>
                <img src={movie.img_url} alt=''/>
                <div>
                  <p className='card-content'>Title: {movie.title}</p>
                  <p className='card-content'>Avg rating: {movieRating}</p>
                </div>
              </li>
            </ul>
          </Link>
        </div>
      )
    })

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text' 
            name='selectedTitle' 
            placeholder='Search By Title' 
            value={titleInput}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn' disabled={!titleInput}>Submit</button>
        </form>

        <div className='movie-container'>
          { !this.props.movies.length ? <h4>Loading...</h4> : 
            ( movieList.length ? 
              movieList : <h4> No such a movie was found!</h4> )
          }
        </div>
      </div>
    )
  }
}

export default AllMovies;