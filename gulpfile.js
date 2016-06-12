/**
 * Created by Aditya on 5/31/2016.
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var ngHtml2Js = require("gulp-ng-html2js");

gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: 3000
    })
});

// this should run after templates is run
gulp.task('browserify', ['templates'], function() {
    // Grabs the app.js file
    console.log('running browserify');
    return browserify('./app/app.js')
    // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('templates',function() {
    // can modularize templates later
    return gulp.src('app/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: 'myCio.templates',
            prefix: '/templates/'
        }))
        .pipe(concat('templateCache.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function() {
    console.log('running sass');
    return gulp.src('./style/main.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    // run browserify if any js file changes
    gulp.watch('app/**/*.js', ['browserify']);
    // run sass if any style changes
    gulp.watch('style/**/*.scss', ['sass']);
    // copy index whenever it changes
    gulp.watch('app/index.html',['copy']);
    // recreate template cache and browserify if any html partial is changed
    gulp.watch('app/**/*.html',['templates','browserify']);
});

gulp.task('copy', function() {
    console.log('copying files');
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));
});

// build html, js and css
gulp.task('build',['copy','browserify','templates','sass']);

gulp.task('default', [
    'build',
    'connect',
    'watch'
]);
