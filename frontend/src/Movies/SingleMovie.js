import React from 'react';
// import { withRouter } from 'react-router';
import axios from 'axios';
import '../stylesheets/SingleMovie.css';

class SingleMovie extends React.Component {
  state = {
    movie: [],
    comments: ''
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { comments } = this.state;
    const id = this.props.match.params.movie_id;
    axios.post('/comments/new',{
      text: comments,
      movie_id: id
    })
    .then(res => {
      console.log(res)
      this.setState({
        comments: ''
      })
    })
  }
  
  render() {
    const { movie } = this.state;
    let id = parseInt(this.props.match.params.movie_id);

    let movieObj = movie.find(mov => mov.id === id );

    let commentList = movie.map((movie, i) => {
      return (
        <div className='card' key={ i + 1}>
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
        {/* <div className='comments'> */}
          <form className='comments' onSubmit={this.handleSubmit}>
            <textarea placeholder='please add your comments' onChange={this.handleChange} name='comments'/>
            <button type='submit' disabled={!this.state.comments}>Submit</button>
          </form>
        {/* </div> */}
        { commentList }
      </div>
    )
  }
}

export default SingleMovie;