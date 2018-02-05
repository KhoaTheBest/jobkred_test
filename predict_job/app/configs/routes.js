/* jshint node: true */
'use strict';
module.exports = function(app){
    // Recommend Job
    app.use('/recommend_job_titles', require('../controllers/jobCtrl'));
};