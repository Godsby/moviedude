import React from 'react';

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
      return (
        <div className='card small' key={movie.id}>
          <div className='card-image'>
            <img src={movie.img_url} alt='' />
            <span className='card-title orange-text'>Title: {movie.title}</span>
            <div>
              <p className='center grey-text rating'>Avg rating: {movie.avg}</p>
            </div>
          </div>
        </div>
      )
    })

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text' 
            name='selectedTitle' 
            placeholder='Search By Title' 
            value={titleInput}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn' disabled={!titleInput}>Submit</button><hr/>
        </form>

        <div className='container'>
          { !this.props.movies.length ? <h4>Loading...</h4> : 
            ( movieList.length ? 
              movieList : <h4> No such a movie was found!</h4> )
          }
        </div>
      </>
    )
  }
}

export default AllMovies;