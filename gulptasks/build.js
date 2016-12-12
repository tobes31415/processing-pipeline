var gulp = require('gulp');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var run = require('gulp-run');
var env = require('./constants.js');

function packFiles(entryFilename, outputPath, outputFilename, debug, callback)
{
    var options = {
        entry: [
            entryFilename
        ],
        output: {
          path:outputPath,
          publicPath:'',
          filename: outputFilename,
          libraryTarget: 'umd'
        }
    };
    if (debug)
    {
        options.debug=true,
        options.devtool='inline-source-map';
    }
    else
    {
        //Minify
        //
        // Uglify doesn't support ES6 yet
        options.plugins = [new webpack.optimize.UglifyJsPlugin()]
    }
    webpack(options
    ,function(err, stats){
        if (err)
        {
            console.log(err);
            callback(err);
            return;
        }
        var e = stats.compilation.errors;
        if (e && e.length > 0)
        {
            e.forEach(function(e){console.log (e.message);})
            callback("error");
            return;
        }
        callback(err);
    });
}

gulp.task('webpack-publish-min', function(callback){
    packFiles(env.libSrc+env.libSrcEntry,env.libOut, env.libOutMinEntry, false, callback);
});

gulp.task('webpack-publish', ['webpack-publish-min'], function(callback){
    packFiles(env.libSrc+env.libSrcEntry,env.libOut, env.libOutEntry, true, callback);
});

gulp.task('copyPackage.json', function(){
    return gulp.src(env.root+'package.json')
    .pipe(gulp.dest(env.libOut));
});

gulp.task('prepare-lib', ['webpack-publish']);

gulp.task('copyDevEnv', function(){
    return gulp.src(env.devSrc+'**/*.*')
    .pipe(gulp.dest(env.devOut))
});

gulp.task('copyTestEnv', function(callback){
    return gulp.src(env.testSrc+'**/*.*')
    .pipe(gulp.dest(env.testOut))
});

gulp.task('copyLibToTest', ['prepare-lib'], function(callback){
    return gulp.src(env.libOut+'**/*.*')
    .pipe(gulp.dest(env.testOut +"bower_components/" + env.libName));
});
gulp.task('copyLibToBin', ['prepare-lib'], function(callback){
    return gulp.src([env.libOut+"**/*.*"])
    .pipe(gulp.dest(env.devOut+"bower_components/" + env.libName));
});

gulp.task('copyBowerToBin',function(){
    return gulp.src(env.root+'bower_components/**/*.*')
    .pipe(gulp.dest(env.devOut+'bower_components'));
})

gulp.task('build', function(done){
    runSequence('webpack-publish','copyLibToTest','copyLibToBin', 'copyDevEnv','sass','copyTestEnv','copyBowerToBin', done);
});

gulp.task('clean-build', function(done){
    runSequence('clean', 'build', done);
});