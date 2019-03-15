const { db } = require('../index');

const getAllMovies = (req, res, next) => {
  db.any('SELECT * FROM movies')
  .then(data => {
    res.status(200).json({
      status: 'succsss',
      movies: data,
      message: 'Received All Movies'
    })
  })
  .catch(err => next(err))
}

const allMoviesWithAvgRating = (req, res, next) => {
  db.any('SELECT movies.*, movierating.avg FROM movies JOIN(SELECT AVG(stars), movie_id FROM ratings GROUP BY movie_id) AS movierating ON movierating.movie_id = movies.id')
  .then(data => {
    res.status(200).json({
      status: 'succsss',
      movies: data,
      message: 'Received All Movies With Rating'
    })
  })
  .catch(err => next(err))
}

const singleMovieWithAvgRatingAndComments = (req, res, next) => {
  let movieId = parseInt(req.params.id)
  db.any('SELECT moviewithrating.*,comments.text FROM (SELECT movies.*, movierating.avg FROM movies JOIN (SELECT AVG(stars), movie_id FROM ratings GROUP BY movie_id) AS movierating ON movierating.movie_id = movies.id WHERE id=$1) AS moviewithrating LEFT JOIN comments ON moviewithrating.id = comments.movie_id', movieId)
  .then(data => {
    console.log(data)
    res.status(200).json({
      status: 'succsss',
      data: data,
      message: 'Received A Single Movie With Avg Rating And Comments'
    })
  })
  .catch(err => next(err))
}

const moviesByGenre = (req, res, next) => {
  db.any('SELECT * FROM movies JOIN genres ON genre_id = genres.id')
    .then(data => {
      res.status(200).json({
        status: 'success',
        movies: data,
        message: 'All Movies With Genre'
      })
    })
    .catch(err => next(err));
}

module.exports = { 
  getAllMovies,
  allMoviesWithAvgRating, 
  singleMovieWithAvgRatingAndComments, 
  moviesByGenre
}
