const pgp = require('pg-promise')({});

const db = pgp(process.env.DATABASE_URL || 'postgres://localhost/moviedude');

module.exports = { db };