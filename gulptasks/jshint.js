var gulp = require('gulp');
var env = require('./constants.js');
var jshint = require('gulp-jshint');

gulp.task('jshint-lib', function() {
  gulp.src(env.libSrc+'/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('jshint-dev', function() {
  gulp.src(env.devSrc+'/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('jshint-test', function() {
  gulp.src(env.devSrc+'/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('jshint', ['jshint-dev', 'jshint-lib', 'jshint-test']);
