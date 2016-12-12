var gulp = require('gulp');
var clean = require('gulp-clean');
var env = require('./constants.js');

gulp.task('clean-dev', function(){
    return gulp.src(env.devOut, {read:false}).pipe(clean())
})
gulp.task('clean-lib', function(){
    return gulp.src(env.libOut, {read:false}).pipe(clean())
})
gulp.task('clean-test', function(){
    return gulp.src(env.testOut, {read:false}).pipe(clean())
})

gulp.task('clean', ['clean-dev', 'clean-lib', 'clean-test']);