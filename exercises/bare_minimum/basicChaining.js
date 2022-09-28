/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var GitUser = require('./promisification.js');
var Constructor = require('./promiseConstructor.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // use constructor to find the user name in first line
  return Constructor.pluckFirstLineFromFileAsync(readFilePath)
    // then use gituser to getGitHubProfile
    .then((user) => GitUser.getGitHubProfileAsync(user))
    // then writeFile
    .then((profiles) => {
      console.log(profiles);
      return fs.writeFile(writeFilePath, JSON.stringify(profiles), (err) => {
        if (err) {
          throw ('Failed to write');
        }
      });
    })
    .catch((err) => {
      console.log(err, '---');
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
