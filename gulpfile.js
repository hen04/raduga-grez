"use strict";

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
//const autoprefixer = require('gulp-autoprefixer');

const pug = require('gulp-pug');
const data = require('gulp-data');
const fs = require('fs');

const sourcemaps  = require('gulp-sourcemaps');
const clean = require('gulp-clean');


const path = {
	build: {

	},
	src: {

	},
	watch: {
		root: './build'
	}
};

gulp.task('pug', function (done) {
	gulp.src("src/**/*.pug")
		.pipe(data(function(file) {
			return JSON.parse(fs.readFileSync('./src/data/data.json'));
		}))
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest("build/"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('style', function(done) {
	gulp.src(["src/sass/*.sass", "src/scss/*.scss"])
		.pipe(sourcemaps.init())
		//.pipe(autoprefixer())
		.pipe(sass())
		.pipe(sourcemaps.write('/maps'))
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('csslib', function(done) {
	gulp.src(["src/sass/lib/*.*", "src/scss/lib/*.*"])
		.pipe(gulp.dest("build/css/lib/"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('js', function(done) {
	gulp.src("src/js/*.*")
		.pipe(gulp.dest("build/js/"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('jslib', function(done) {
	gulp.src("src/js/lib/*.js")
		.pipe(gulp.dest("build/js/lib/"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('images', function(done) {
	gulp.src("src/images/**/*.*")
		.pipe(gulp.dest("build/images/"))
		.pipe(browserSync.stream());
	done();
});

gulp.task('fonts', function(done) {
	gulp.src("src/fonts/*.*")
		.pipe(gulp.dest("build/fonts/"))
		.pipe(browserSync.stream());
	done();
});


// очистка папки build
gulp.task('clean', function(done) {
	gulp.src('build/', {read: false})
		.pipe(clean());
	done();
});


gulp.task('build', gulp.series('pug', 'style', 'csslib', 'js', 'jslib', 'images', 'fonts'));

gulp.task('serve', function(done) {
	browserSync.init({
		server: {
			baseDir: path.watch.root
		},
		port: "5000",
		open: false
	});

	gulp.watch("src/**/*.pug", gulp.series('pug'));
	gulp.watch(["src/sass/*.sass", "src/scss/*.scss"], gulp.series('style'));
	gulp.watch(["src/sass/lib/*.*", "src/scss/lib/*.*"], gulp.series('csslib'));
	gulp.watch("src/js/**/*.js", gulp.series('js'));
	gulp.watch("src/js/lib/*.js", gulp.series('jslib'));
	gulp.watch("src/images/**/*.*", gulp.series('images'));
	gulp.watch("src/fonts/*.*", gulp.series('fonts'));
	gulp.watch("*.html").on('change', () => {
		browserSync.reload();
		done();
	});

	done();
});

gulp.task('default', gulp.series('pug', 'style', 'js', 'csslib', 'jslib', 'images', 'fonts', 'serve'));