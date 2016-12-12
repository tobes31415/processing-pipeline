var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var sourcemaps = require('gulp-sourcemaps');
var env = require('./constants.js');

gulp.task('sass', function(){
    return gulp.src(env.devSrc+'**/*.scss', { base: env.devSrc } )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'nested', errLogToConsole: true }) )
    .pipe(flatten())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(env.devOut))
});