//import db to INSERT DATA
const { db } = require('./index');

//import fakerAPI and save it as a varible
const faker = require('faker');

//get fake users data from fakerAPI
let users = [];
for(let i = 0; i < 10; i ++) {
  let username = faker.internet.userName();
  let password_digest = faker.internet.password();
  let str = `('${username}', '${password_digest}')`;
  users.push(str);
}

//get fake genres data from fakerAPI
let genres = [];
for(let i = 0; i < 5; i ++) {
  let name = faker.lorem.words();
  let str = `('${name}')`;
  genres.push(str);
}

//get fake movies data from fakerAPI,should after genres because the foreign key
let movies = [];
for(let i = 0; i < 10; i ++) {
  let title = faker.lorem.sentence();
  let genre_id = Math.ceil(Math.random() * 5);
  let img_url = faker.image.imageUrl();
  let str = `('${title}', '${genre_id}', '${img_url}')`;
  movies.push(str);
}

//get fake ratings data from fakerAPI
let ratings = [];
for(let i = 0; i < 20; i ++) {
  let stars = Math.ceil(Math.random() * 5);
  let movie_id = Math.ceil(Math.random() * 10);
  let str = `('${stars}','${movie_id}')`;
  ratings.push(str);
}

//get fake comments data from fakerAPI
let comments = [];
for( let i = 0; i < 15; i++) {
  let text = faker.lorem.text();
  let movie_id = Math.ceil(Math.random() * 10);
  let str = `('${text}', '${movie_id}')`;
  comments.push(str);
}

//Refine array structure to be interpolated into db
// users = users.join(', ');
// movies = movies.join(', ');
// genres = genres.join(', ');
// ratings = ratings.join(', ');
// comments = comments.join(', ');

//call db and interpolate data from arrays
db.none('INSERT INTO users(username, password_digest) VALUES' + users + ';')
  .then(() => {
    db.none('INSERT INTO genres(name) VALUES' + genres + ';')
      .then(() => {
        db.none('INSERT INTO movies(title, genre_id, img_url) VALUES' + movies + ';')
          .then(() => {
            db.none('INSERT INTO ratings(stars, movie_id) VALUES' + ratings + ';')
              .then(() => {
                db.none('INSERT INTO comments(text, movie_id) VALUES' + comments + ';')
              })
          })
      })
  })
  .catch(err => console.log(err));














