var gulp = require('gulp');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var env = require('./constants.js');

gulp.task('start', function(done){
    runSequence('clean', 'build','watch',function(done){
       gulp.src('./bin').pipe(webserver({open:false, livereload:true})); 
    })  
});
gulp.task('watch', function(){
    gulp.watch([env.libSrc+'**/*.*',env.devSrc+'**/*.*',env.testSrc+'**/*.*'],function(){
        runSequence('build', 'test-run');
    }, 10000);
});