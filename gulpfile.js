/* Variable Defination */
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssbeautify = require('gulp-cssbeautify');
var concatJs = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var htmlbeautify = require('gulp-html-beautify');
var gulpimage  = require('gulp-image');
var bower = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: "public/"
    });
    gulp.watch("app/sass/**/*.scss", gulp.series('sass'));
    gulp.watch("app/js/*.js", gulp.series('concatJs'));
    gulp.watch("app/html/**/*.html", gulp.series('nunjucksRender'));
    gulp.watch("app/media/**/*", gulp.series('copy-img'));
    //gulp.watch("app/media/**/*", gulp.series('gulpimage'));
});

// Compile Sass File
gulp.task('sass', function () {
  return gulp.src('app/sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssbeautify({
        indent: '    ',
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browserSync.stream());
});

// Concat Js File
gulp.task('concatJs', function () {
  return gulp.src('app/js/*.js')
    .pipe(concatJs('app.js'))

    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream());
});

// NunjucjsRender
gulp.task('nunjucksRender', function () {
  return gulp.src('app/html/*.html')
    .pipe(nunjucksRender({
      path: ['app/html/template-parts/']
    }))
    .pipe(htmlbeautify({
        indentSize: 2
    }))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
});

// Gulp Image //
//gulp.task('gulpimage', function () {
    //return gulp.src('app/media/**/*')
    //.pipe(gulpimage({
        //jpegRecompress: false,
    //}))
    //.pipe(gulp.dest('public/media'))
    //.pipe(browserSync.stream());
//});

// copy Images
gulp.task('copy-img', function () {
    return gulp.src('app/media/**/*')
        .pipe(gulp.dest('public/media'))
        .pipe(browserSync.stream());
});

// Bower
gulp.task('bower', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./public/dependencies/'))
});


//Defult Task
gulp.task('default', gulp.parallel('browserSync', 'bower'));
