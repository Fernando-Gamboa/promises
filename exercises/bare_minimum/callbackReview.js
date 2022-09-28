/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  // read a specific file at file path
  fs.readFile(filePath, 'utf8', (err, text) => {
    // if error exist
    if (err) {
      // use callback with error and text
      callback(err, text);
    } else { // otherwise
      // split text by new lines and grab first line
      text = text.split('\n')[0];
      // invoke callback with null and the text
      callback(null, text);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  // do a get request at given url
  request.get(url, function (error, response) {
    // if error exist
    if (error) {
      // return callback with error and response
      return callback(error, response);
    } else if (!error && response.statusCode == 200) {
      // else if error doesnt exist AND status code is 200
      // return callback with null and status code
      return callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
