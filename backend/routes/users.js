var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json([{
    id: 1,
    username: 'Leo'
  }, {
    id: 2,
    username: 'Reed'
  }]);
});

module.exports = router;
