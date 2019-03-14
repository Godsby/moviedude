const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  allMoviesWithAvgRating,
  singleMovieWithAvgRating,
  moviesByGenre,
  allMoviesWithAvgRatingBiggerThan
} = require('../db/queries/movieQ');

router.get('/', getAllMovies);
router.get('/ratings', allMoviesWithAvgRating);
router.get('/ratings/:id', singleMovieWithAvgRating);
router.post('/ratings', allMoviesWithAvgRatingBiggerThan)
router.get('/genres/:id', moviesByGenre);

module.exports = router;