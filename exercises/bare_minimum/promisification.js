/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
// CONVERT CALLBACKS WITH PROMISIFY ---
var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};
// converts callbacks to promises
var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO


// (2) Asyncronous token generation
// CONVERT CALLBACKS WITH PROMISIFY ---
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};
// converts callbacks to promises
var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO


// (3) Asyncronous file manipulation
// CONVERT CALLBACKS WITH PROMISIFY ---
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(null, funnyFile);
  });
};
// converts callbacks to promises
var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny); // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
