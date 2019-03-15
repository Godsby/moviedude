const express = require('express');
const router = express.Router();
const { addComments } = require('../db/queries/commentsQ');

router.post('/new', addComments);

module.exports = router;