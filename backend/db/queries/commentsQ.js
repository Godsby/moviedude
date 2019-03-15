const { db } = require('../index');

const addComments = ( req, res, next ) => {
  db.one("INSERT INTO comments(text, movie_id) VALUES(${text}, ${movie_id}) RETURNING *", req.body)
  .then(data => {
    res.status(200).json({
      status: 'Success',
      movie: data,
      message: 'New Comment Added'
    })
  })
  .catch(err => next (err));
}

module.exports = { addComments }