var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(gulp.dest('temp/css'));
});

gulp.task('uglify', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('bulid/js'));
});

gulp.task('minifyCss', function() {
	return gulp.src('temp/css/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('bulid/css'));
});

gulp.task('sever', function() {
	var files = [
					'**/*.html',
					'**/*.css',
					'**/*.js',
					'**/*.php'
				];

	browserSync.init({
		files: files,
		proxy: 'localhost/demo/baidunews/news.html'
	});

	gulp.watch('src/scss/news.scss',['sass']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default',['sever']);
// gulp.task('default',['minifyCss']);
