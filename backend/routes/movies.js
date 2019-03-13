const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  allMoviesWithAvgRating,
  moviesByGenre,
  allMoviesWithAvgRatingBiggerThan
} = require('../db/queries/movieQ');

router.get('/', getAllMovies);
router.get('/ratings', allMoviesWithAvgRating);
router.post('/ratings', allMoviesWithAvgRatingBiggerThan)
router.get('/genres/:id', moviesByGenre);

module.exports = router;