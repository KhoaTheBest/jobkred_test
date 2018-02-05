/* jshint node: true */
'use strict';
const Promise = require("bluebird");
const db = require("sqlite");
const lineReader = require('line-reader');
var dist = require('./spellCheckHelper');
var dbPromise;
module.exports = function(callback) {
    Promise.resolve()
        // Open the database
        .then(() => {
            dbPromise = db.open('./database.sqlite', {
                Promise
            });
        }) // Update db schema 
        // .then(() => db.migrate({
        //     force: 'last'
        // }))
        .then(() => {
            lineReader.eachLine('clean_job_titles.md', (line, last) => {
                // db.run("INSERT INTO Job (name) VALUES (?)", line);
                dist.prepareDicts(line);
            });
        }) // Display error message 
        .catch((err) => console.error(err.stack))
        // Finally, launch the Node.js app
        .finally(callback);
};

module.exports.queryMatchedJob = async (queryString) => {
    const preparedQuery = "SELECT name FROM Job WHERE name IN (" + queryString + ")";
    const db = await dbPromise;
    const [jobs] = await Promise.all([
        db.all(preparedQuery)
    ]);

    return jobs;
}