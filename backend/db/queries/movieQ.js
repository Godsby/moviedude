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

const allMoviesWithAvgRatingBiggerThan = (req, res, next) => {
  let ratingValue = parseInt(req.body.rating)
  db.any('SELECT movies.*,movierating.avg FROM movies JOIN(SELECT AVG(stars), movie_id FROM ratings GROUP BY movie_id HAVING AVG(stars) >= $1) AS movierating ON movierating.movie_id = movies.id', ratingValue)
  .then(data => {
    res.status(200).json({
      status: 'succsss',
      movies: data,
      message: 'Received All Movies With Avg Rating Greater Than 4.0'
    })
  })
  .catch(err => next(err))
}

const moviesByGenre = (req, res, next) => {
  let genreId = parseInt(req.params.id);
  db.any('SELECT movies.* FROM movies JOIN genres ON genre_id = genres.id WHERE genre_id = $1', genreId)
    .then(data => {
      res.status(200).json({
        status: 'success',
        movies: data,
        message: 'All Movies For A Genre'
      })
    })
    .catch(err => next(err));
}

module.exports = { 
  getAllMovies,
  allMoviesWithAvgRating, 
  moviesByGenre,
  allMoviesWithAvgRatingBiggerThan
}
