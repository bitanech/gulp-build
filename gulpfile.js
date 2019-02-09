const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const replace = require('gulp-replace');

const styles = () => {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(replace('url("../img/', 'url("./img/'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
};

const html = () => {
  return gulp.src('./src/*.html')
      .pipe(gulp.dest("./dist"))
      .pipe(browserSync.stream());
};

const img = () => {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img'));
};

const fonts = () => {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
};

const cleanDist = () => {
    return gulp.src('./dist/*')
        .pipe(clean());
};

function defaultTask(cb) {
    cb();
}

function devWatch(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/styles/**/*.scss', gulp.series(styles));
    gulp.watch('./src/*.html', gulp.series(html));
    gulp.watch('./src/img/*', gulp.series(img));
    cb();
}
exports.default = defaultTask;
exports.devWatch = devWatch;
