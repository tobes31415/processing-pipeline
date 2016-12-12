var gulp = require('gulp');
var runSequence = require('run-sequence');
var run = require('gulp-run');
var env = require('./constants.js');

gulp.task('test-run', function(done){
    return run("mocha "+env.testOut+" -r mock-local-storage --use_strict --harmony --compilers js:babel-core/register").exec();
});

gulp.task('test', function(){
    runSequence('clean','build','test-run')
});
