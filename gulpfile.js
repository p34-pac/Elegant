const { src, dest, series, watch } = require('gulp');


// styles
const scss = require('gulp-sass')(require('sass'))
import autoPrefixer from 'gulp-autoprefixer';
const cssMinify = require('gulp-clean-css')

function styles() {
    return src('./assets/**/*.css')
    .pipe( autoprefix('last 2 versions') )
    .pipe(cssMinify())
    .pipe(dest('./assets/css/styles'))
    
}


//scripts

const jsMinify = require('gulp-terser')

function scripts() {
    return src('./assets/**/*.js')
    .pipe(jsMinify())
    .pipe(dest('./assets/minscripts'))
}

//watch task

function watchTask() {
    watch(
        ['./assets/**/*.css', './assets/**/*.js'],
        series(styles, scripts)
    )
}

exports.default = series(styles, scripts, watchTask)