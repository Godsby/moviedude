const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  allMoviesWithAvgRating,
  singleMovieWithAvgRatingAndComments,
  moviesByGenre,
} = require('../db/queries/movieQ');

router.get('/', getAllMovies);
router.get('/ratings', allMoviesWithAvgRating);
router.get('/ratings/comments/:id', singleMovieWithAvgRatingAndComments);
router.get('/genres', moviesByGenre);

module.exports = router;