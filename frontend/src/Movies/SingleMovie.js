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
        console.log(res.data.data[0])
        this.setState({
          movie: res.data.data[0]
        })
      })
  }
  
  render() {

    return ( 
      <div className='container'>
        <h1> {this.state.movie.title} </h1>
      </div>
    )
  }
}

export default SingleMovie;