var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('dev/scss/app.scss')
		.pipe(sass())
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('assets/css'))
});

gulp.task('js', function() {
	return gulp.src('dev/js/picross.js')
		.pipe(gulp.dest('assets/js'))
});

gulp.task('watch', function() {
	gulp.watch('dev/**/*.scss', ['sass']);
	gulp.watch('dev/**/*.js', ['js']);
});