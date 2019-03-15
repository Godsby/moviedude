import React from 'react';
// import { withRouter } from 'react-router';
import axios from 'axios';
import '../stylesheets/SingleMovie.css';

class SingleMovie extends React.Component {
  state = {
    movie: []
  }

  componentDidMount() {
    let id = this.props.match.params.movie_id;

    axios.get('/movies/ratings/comments/' + id)
      .then(res => {
        this.setState({
          movie: res.data.data
        })
      })
  }
  
  render() {
    const { movie } = this.state;
    let id = parseInt(this.props.match.params.movie_id);

    let movieObj = movie.find(mov => mov.id === id );

    let commentList = movie.map(movie => {
      return (
        <div className='card' key={movie.id}>
          <ul className = 'comments'>
            <li>
              <p className='card-content'>Comments: {movie.text}</p>
            </li>
          </ul>
        </div>
      )
    })

    return ( 
      <div className='container'>
        { movie.length ? ( 
          <>
          <p className='card-content'>Avg rating: {parseFloat(movieObj.avg).toFixed(2)}</p>
          <img src={movieObj.img_url} alt=''/>
          <p className='card-content'>Title: {movieObj.title}</p>
          </>
        ) : (<h4>Loading...</h4>)}
        
        { commentList }
      </div>
    )
  }
}

export default SingleMovie;