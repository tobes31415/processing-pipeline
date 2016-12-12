var gulp = require('gulp');
var beautify = require('gulp-beautify');
var env = require('./constants.js');

gulp.task('beautify-lib', function() {
  gulp.src(env.libSrc+'/**/*.js')
    .pipe(beautify())
    .pipe(gulp.dest(env.libSrc))
});
gulp.task('beautify-dev', function() {
  gulp.src(env.devSrc+'/**/*.js')
    .pipe(beautify())
    .pipe(gulp.dest(env.devSrc))
});
gulp.task('beautify-test', function() {
  gulp.src(env.testSrc+'/**/*.js')
    .pipe(beautify())
    .pipe(gulp.dest(env.testSrc))
});
gulp.task('beautify', ['beautify-dev', 'beautify-lib', 'beautify-test']);
