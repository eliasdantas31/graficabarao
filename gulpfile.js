const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function minificaJs() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function minificaImagem() {
    return gulp.src('./src/imagens/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 70, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./build/imagens'));
}


function assistirArquivos() {
    gulp.watch('./src/styles/**/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false }, gulp.series(minificaJs));
    gulp.watch('./src/imagens/**/*.{png,jpg,jpeg,gif,svg}', { ignoreInitial: false }, gulp.series(minificaImagem));
}
exports.default = assistirArquivos;