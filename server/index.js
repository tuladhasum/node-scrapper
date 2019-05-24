const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

function getResults(body){
   const $ = cheerio.load(body);
   const rows = $('li.result-row');
   const results =[];

   rows.each((index, element) => {
      const result = $(element);
      const title = result.find('.result-title').text();
      const price = $(result.find('.result-price').get(0)).text();
      const hood = result.find('.result-hood').text();
      const imageData = result.find('a.result-image').attr('data-ids');
      let images = [];
      if(imageData){
         const parts = imageData.split(',');
         images = parts.map((id)=>{
            return `http://images.craiglist.org/${id.split(':')[1]}_300x300.jpg`
         })
      }
      results.push({
         title, price, hood, images
      });
      // console.log(results);
   });
   return results;
}

app.get('/', (request, response) => {
   response.json({
      message: "Hello world"
   });
});

app.get('/search/:location/:search_term', (request, response) => {
   console.log(request.params);

   // de-structuring
   const {location, search_term} = request.params;

   const url = `https://${location}.craigslist.org/search/msa?=sort=date&query=${search_term}`;

   fetch(url)
      .then(response => response.text())
      .then(body => {
         const results = getResults(body);
         response.json({
            url,
            results
         });
      });
});

app.use((request, response, next) => {
   const error = new Error('not found');
   response.status(404);
   next(error);
});

app.use((error, request, response, next) => {
   response.status(response.statusCode || 500);
   response.json({
      message: error.message
   });
});

app.listen(5000, () => {
   console.log('Listening on port 5000');
});