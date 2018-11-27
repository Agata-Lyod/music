const gulp = require('gulp')
      prefixer = require('gulp-autoprefixer');
      //rigger = require('gulp-rigger'),
      myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
      csso = require('gulp-csso'), // Минификация CSS
      imagemin = require('gulp-imagemin'); // Минификация изображений
      uglify = require('gulp-uglify'), // Минификация JS
      concat = require('gulp-concat'), // Склейка файлов
      //connect = require('connect'), // Webserver
      less = require('gulp-less'),
      path = require('path'),
      changed = require('gulp-changed'),
      browserSync = require('browser-sync').create(),
      fileinclude = require('gulp-file-include');


gulp.task('prefixer', () =>
    gulp.src('dist/*.css')
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);
gulp.task('html', function() {

    return gulp.src(['blocks/general/index.html'])
        .pipe(changed('dist'))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream()); // даем команду на перезагрузку страницы
});
gulp.task('css', function() {

    return gulp.src(['blocks/general/i-variables.less','blocks/general/i-less.less','blocks/general/general.less','blocks/**/*.less'])
        .pipe(changed('dist'))
        .pipe(concat('style.less'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream()); // даем команду на перезагрузку страницы
});
gulp.task('js', function() {

    return gulp.src(['blocks/**/*.js'])
        .pipe(changed('dist'))
        .pipe(concat('script.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream()); // даем команду на перезагрузку страницы
});
gulp.task('watch', function() {
    gulp.watch('blocks/**/*.html', gulp.series('html'));
    gulp.watch('blocks/**/*.less', gulp.series('css'));
    gulp.watch('blocks/**/*.js', gulp.series('js'));

});
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('blocks/**/*.less', gulp.series('css'));
    gulp.watch('blocks/**/*.js', gulp.series('js'));
    gulp.watch('blocks/**/*.html', gulp.series('html'));
});
gulp.task('default', gulp.series('html','css','js','webserver'));