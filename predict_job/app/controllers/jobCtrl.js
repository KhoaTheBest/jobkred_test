/* jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var dbHelper = require('../helpers/dbHelper');
var stringHelper = require('../helpers/stringHelper');


router.get('/', async (req, res, next) => {
    try {
        var inputQuery = req.query.q;
        var response = {};
        if (inputQuery && inputQuery.length > 0) {
            var keywords = stringHelper.extractKeywords(inputQuery);
            var queryString = stringHelper.prepareQueryString(keywords);
            var matchedJobs = await dbHelper.queryMatchedJob(queryString);

            if (matchedJobs.length > 0) {
                response.jobs = matchedJobs;
            } else {
                response.msg = 'Job not found';
            }
        } else {
            response.error = 'Empty Params';
        }
        res.json(response);
    } catch (error) {
        res.status(500).send({ error: 'Wrong Input' });
    }
});

module.exports = router;