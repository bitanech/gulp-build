const gulp = require('gulp');
const sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');

const scssToCss = () => {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
};

const minifyCss = () => {
  return gulp.src('dist/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest("dist"));
};

const movePagesToDist = () => {
  return gulp.src('./src/*.html')
      .pipe(gulp.dest("./dist"));
};

function defaultTask(cb) {
    scssToCss();
    minifyCss();
    cb();
}

function devWatch(cb) {
    gulp.watch('./src/styles/**/*.scss', gulp.series(scssToCss, minifyCss));
    gulp.watch('./src/*.html', gulp.series(movePagesToDist));
    cb();
}
exports.default = defaultTask;
exports.devWatch = devWatch;