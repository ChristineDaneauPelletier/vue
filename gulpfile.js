const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync");
const connect = require('gulp-connect-php');
const svgSprite = require('gulp-svg-sprites');
var terser = require('gulp-terser');

function styles(cb) {
    return gulp.src('./ressources/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({
            /*browsers: ['last 2 versions'],*/
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./liaisons/css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    connect.server({}, function (){ browserSync( {
        // proxy: "localhost:8888/vueSocks" }); // cégep
        proxy: "localhost/vue/vueSocks" }); // maison
    });
    gulp.watch('./*.php').on("change",browserSync.reload);
    gulp.watch('./ressources/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./liaisons/js/*.js').on("change",browserSync.reload);
    gulp.watch('./*.html').on("change",browserSync.reload);
    cb();
}


var config = {
    mode: {
        //css: true, // Create a «css» sprite
        // view: true, // Create a «view» sprite
        // defs: true, // Create a «defs» sprite
         symbol: true, // Create a «symbol» sprite
        //  stack: true // Create a «stack» sprite
    }
};

function sprite(){
    return gulp.src('.ressource/images/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./liaisons/images/svg'));
}

function defaut(cb){
    console.log("allo");
    // place code for your default task here
    cb();
}

// Méthode pour compresser tous les .js // IMPORTANT À FAIRE À LA FIN
function compressjs(cb) {
    return gulp.src('./liaisons/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./liaisons/js/'));
    cb();
}

exports.default=defaut;
exports.styles=styles;
exports.watch=watch;
exports.sprite=sprite;
exports.compressjs=compressjs;