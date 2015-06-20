var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
//var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var less = require('gulp-less');


var libraries = [
  './bower_components/angular/*.js',
  './bower_components/angular-bootstrap/*.js',
  './bower_components/jquery/dist/*.js',
  './bower_components/bootstrap/**/*.js'
];

gulp.task('buildLib', function() {
  gulp.src(libraries)
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build/js'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
    livereload: true,
      directoryListing: true,
      open: true
  }));
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('imageMin', function() {
  return gulp.src('./img/**/*.*')
    .pipe(imagemin({
    optimizationLevel: 7
  }))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', ['cssConcat'], function () {
    gulp.watch('./css/**/*.css', ['cssConcat']);
    gulp.watch('./js/**/*.js', ['jsUglify']);
});

gulp.task('cssConcat', function() {
  return gulp.src(['./css/**/*.css', './bower_components/angular-bootstrap/ui-bootstrap-csp.css'])
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('cssMin', function () {
 return gulp.src('./css/**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./build/css'));
            
});

gulp.task('jsUglify', function() {
  return gulp.src('./js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('templates', function() {
  gulp.src('./index.html')
      .pipe(gulp.dest('./build'));
});

gulp.task('default', ['cssConcat', 'jsUglify', 'watch', 'webserver', 'templates', 'buildLib', 'less', 'cssMin']);