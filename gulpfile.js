const gulp = require('gulp')
      prefixer = require('gulp-autoprefixer');
      //lr = require('tiny-lr'), // Минивебсервер для livereload
      //livereload = require('gulp-livereload'); // Livereload для Gulp
      rigger = require('gulp-rigger'),
      myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
      csso = require('gulp-csso'), // Минификация CSS
      imagemin = require('gulp-imagemin'); // Минификация изображений
      uglify = require('gulp-uglify'), // Минификация JS
      concat = require('gulp-concat'), // Склейка файлов
      connect = require('connect'), // Webserver
      //server = lr();
      less = require('gulp-less'),
      path = require('path'),
      changed = require('gulp-changed'),
      browserSync = require("browser-sync").create();
      //reload = browserSync.reload;
      //watch = require('gulp-watch');
const config = {
        server: {
          baseDir: "./"
        },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "zhurkina"
      };
gulp.task('prefixer', () =>
    gulp.src('dist/*.css')
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);
gulp.task('css', function () {  
    return gulp.src(['blocks/general/i-variables.less','blocks/general/i-less.less','blocks/general/general.less','blocks/**/*.less'])
        .pipe(changed('dist'))
        .pipe(concat('style2.less'))
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
gulp.task('watch', function () {  
    gulp.watch('blocks/**/*.less', gulp.series('css'));
});
gulp.task('webserver', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('blocks/**/*.less', gulp.series('css'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('default', gulp.series('css','webserver'));