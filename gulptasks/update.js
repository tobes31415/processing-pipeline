var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('update npm', function(done){
    return run("npm install").exec();
});
gulp.task('update bower', function(done){
    return run("bower install").exec();
});
gulp.task('update', ['update npm','update bower']);
