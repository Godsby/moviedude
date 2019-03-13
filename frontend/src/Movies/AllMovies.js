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
    let movieFilter = movies;

    if (titleInput) {
      movieFilter = movies.filter(movie => {
        return movie.title.includes(titleInput);
      })
      if (movieFilter.length !== 0) {
        this.setState({
          movieFilter: movieFilter
        })
      }
    }
  }

  render () {
    const { movieFilter, titleInput, formSubmitted } = this.state;
    let movieList;
    
    if ( !movieFilter && formSubmitted )  {
      return <h4>No such a movie was found!</h4>
    } else if (!movieFilter) {
      const { movies } = this.props;
      movieList = movies.map(movie => {
        return (
          <div className = "card small" key={movie.id}>
            <div className = "card-image" >
              <img src = {movie.img_url} alt='' />
              <span className = "card-title orange-text " > Title:{movie.title} </span> 
            </div> 
              <p className = "center grey-text rating" > Avg rating:{movie.avg} </p> 
          </div> 
        )
      })
    } else {
        movieList = movieFilter.map(movie => {
        return (
          <div className = "card small" key={movie.id}>
            <div className = "card-image" >
              <img src = {movie.img_url} alt='' />
              <span className = "card-title orange-text " > Title:{movie.title} </span> 
            </div> 
              <p className = "center grey-text rating" > Avg rating:{movie.avg} </p> 
          </div> 
        )
      })
    }

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

        <div className='movie container'>
          {movieList}
        </div>
      </>
    )
  }
}

export default AllMovies;