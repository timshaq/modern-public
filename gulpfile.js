const gulp = require('gulp');
const concat = require('gulp-concat');
const autopref = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require('./webpack.config.js');
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const changed = require('gulp-changed');
const fileinclude = require("gulp-file-include");
const less = require("gulp-less");
const groupCss = require('gulp-group-css-media-queries');


const src = {
    js: './src/assets/js/**/*',
    css: './src/assets/less/**/*',
    img: './src/assets/img/**/*',
    lib: './src/assets/lib/**/*',
    fonts: './src/assets/fonts/**/*',
    fontsConvert: './src/assets/fonts/',
    ttfFonts: './src/assets/fonts/**/*.ttf',
    html: './src/*.html',
    htmlComponents: './src/assets/html/**/*.html'
}


const build = {
    js: './build/assets/js/',
    css: './build/assets/css/',
    img: './build/assets/img/',
    lib: './build/assets/lib/',
    fonts: './build/assets/fonts/',
    html: './build/'
}

// WATCH
function styles() {
    return gulp.src('./src/assets/less/style.less')
    .pipe(
        less({
            outputStyle: "expanded"
        })
    )
    .pipe(autopref({
        overrideBrowserslist:  ['last 100 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.init())
    .pipe(concat(`style.css`))
        .pipe(groupCss())
        .pipe(sourcemaps.write('/srcmaps/'))
        .pipe(gulp.dest(build.css))
    .pipe(cleanCSS({
        level: 2 
    }))
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
    .pipe(gulp.dest(build.css))
    .pipe(browserSync.stream())
}

function scripts(modeName) {
    return gulp.src(src.js)
    .pipe(webpackStream(webpackConfig(modeName)), webpack)
    // .pipe(webpack({
    // }))
    // .pipe(babel())
    // .on('error', console.error.bind(console))
    // .pipe(concat(`script.js`))
    //     .pipe(gulp.dest(build.js))
    // .pipe(uglify({
    //     toplevel: true
    // }))
    // .pipe(gulp.dest(build.js))
    // .pipe(
    //     rename({
    //         extname: ".min.js"
    //     })
    // )
    .pipe(gulp.dest(build.js))
    .pipe(browserSync.stream())
}

function libraries() {
    return gulp.src(src.lib)
        .pipe(gulp.dest(build.lib))
}

// конвертация в форматы
function fontsConvertation() {
    return gulp.src(src.ttfFonts)
        .pipe(ttf2woff())
        .pipe(gulp.dest(src.fontsConvert))
    .pipe(gulp.src(src.ttfFonts))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(src.fontsConvert));
}

// только перенос
function fonts() {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(build.fonts))
}


function compress () {
    return gulp.src(src.img)
    .pipe(webp({
        quality: 100
    }))
    .pipe(gulp.dest(build.img))

    .pipe(gulp.src(src.img))
    .pipe(gulp.dest(build.img))
    .pipe(browserSync.stream())
}

function clean() {
    return del([build.css, build.html, build.fonts, build.img, build.js, build.lib])
}

function html() {
    return gulp.src(src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(build.html))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: 'build/index.html',
            directory: true
        }
    });
    // SASS
    gulp.watch(src.css, styles)
    gulp.watch(src.img, compress)
    gulp.watch(src.js, devScripts)
    gulp.watch(src.lib, libraries)
    gulp.watch(src.fonts, fonts)
    gulp.watch(src.html, html).on('change', browserSync.reload);
    gulp.watch(src.htmlComponents, html).on('change', browserSync.reload);
}


const buildScripts = () => scripts('production');
const devScripts = () => scripts('development');

//gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(fonts, html, styles, buildScripts, compress, libraries)));

gulp.task('watch', gulp.series(clean, gulp.parallel(fonts, html, styles, devScripts, compress, libraries), watch));

// gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('clean', clean);
gulp.task('compress', compress);
gulp.task('styles', styles);
gulp.task('bScripts', buildScripts);
gulp.task('dScripts', devScripts);
gulp.task('fonts', fonts);
gulp.task('html', html);
gulp.task('libraries', libraries);

gulp.task('fonts-convert', fontsConvertation)