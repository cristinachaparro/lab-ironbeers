const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(response => {
      res.render('beers.hbs', {
        beerInfo: response
      });
    })
    .catch();
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((response) => {
    const randomBeer = response[0];
    res.render("random-beer.hbs", randomBeer)
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get("/beers/:id", async (req, res) => {

  const response = await punkAPI.getBeer(req.params.id)
  const id = response[0]


  res.render("one-beer.hbs", id)

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
