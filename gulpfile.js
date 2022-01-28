	// Определяем константы Gulp
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rigger = require('gulp-rigger');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function browserSync() {
	browsersync.init({
        server: {
            baseDir: "./app/"
        },
        notify: false,
    });
}


function html() {
	return gulp.src(['app/build/**/**/*.html', '!app/build/includes/**/*.html'])
	.pipe(rigger())
	.pipe(gulp.dest('./app/'))
	.pipe(browsersync.reload({
		stream: true
	}));
}

function buildStyles() {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	overrideBrowserslist: [
			'last 3 versions',
			'> 5%'
		]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./app/css'))
    .pipe(browsersync.reload({
		stream: true
	}));
};


let serve = gulp.parallel(html, buildStyles, browserSync, function() {
	gulp.watch('./app/sass/**/*.scss', gulp.parallel('sass'));
	gulp.watch('./app/build/**/*.html', gulp.parallel('html'));
	gulp.watch('./app/js/**/*.js').on('change', browsersync.reload);
});

exports.sass = buildStyles;
exports.html = html;
exports.watch = serve;
exports.default = serve;