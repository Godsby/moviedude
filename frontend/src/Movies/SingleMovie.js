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
    console.log(id)
    // let movie = this.props.movies.filter(movie => {
    //   return movie.id === id
    // })
    axios.get('/movies/ratings/' + id)
      .then(res => {
        this.setState({
          movie: res.data.movies[0]
        })
      })
  }
  
  render() {
    return ( 
      <div className='container'>
        <h1> {this.state.movie.id} </h1>
      </div>
    )
  }
}

export default SingleMovie;