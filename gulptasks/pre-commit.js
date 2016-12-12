var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('pre-commit', function(done){
    runSequence('beautify', 'clean-build', 'test-run', 'jshint', done);
});
