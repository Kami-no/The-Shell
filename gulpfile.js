const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync").create();

// css plugins
const autoprefixer = require('gulp-autoprefixer');

function reload(done) {
    browserSync.reload();
    done();
}

function styles() {
    return gulp.src('assets/scss/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
}

function release() {
    const targetDir = 'dist/';
    const themeName = require('./package.json').name;
    const filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules/**',
        '!dist/**',
        '!assets/scss/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}

function watchFiles() {
    browserSync.init({
        proxy: "localhost:2368"
    });

    gulp.watch(['assets/scss/**/*.scss'], styles);
    gulp.watch(['**/*.hbs'], reload);
}


exports.styles = styles;
exports.release = release;
exports.watch = watchFiles;
