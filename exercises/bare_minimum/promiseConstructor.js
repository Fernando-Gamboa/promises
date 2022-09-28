/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  // return new promise
  return new Promise((resolve, reject) => {
    // read file at given path
    fs.readFile(filePath, 'utf8', (err, text) => {
      // if error exist
      if (err) {
        // reject promise with err
        reject(err);
      } else { // otherwise
        // split text by new line and assing it to the first line
        text = text.split('\n')[0];
        // resolve promise with text
        resolve(text);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  // return new promise
  return new Promise((resolve, reject) => {
    // do a get request at given url
    request.get(url, function (error, response) {
      // if error exist
      if (error) {
        // reject promise with err
        reject(error);
      } else if (!error && response.statusCode === 200) {
        // else if error doesnt exist AND status code is 200
        // resolve promise with status code
        resolve(response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
