/**
 * Created by Aditya on 5/31/2016.
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: 3000
    })
});

gulp.task('browserify', function() {
    // Grabs the app.js file
    console.log('running browserify');
    return browserify('./app/app.js')
    // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
    console.log('running sass');
    return gulp.src('./style/main.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('style/**/*.scss', ['sass']);
});

gulp.task('copy', function() {
    console.log('copying files');
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', [
    'copy',
    'browserify',
    'sass',
    'connect',
    'watch'
]);
