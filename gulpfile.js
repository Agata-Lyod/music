const gulp = require('gulp')
      prefixer = require('gulp-autoprefixer');
      lr = require('tiny-lr'), // Минивебсервер для livereload
      livereload = require('gulp-livereload'); // Livereload для Gulp
      rigger = require('gulp-rigger'),
      myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
      csso = require('gulp-csso'), // Минификация CSS
      imagemin = require('gulp-imagemin'); // Минификация изображений
      uglify = require('gulp-uglify'), // Минификация JS
      concat = require('gulp-concat'), // Склейка файлов
      connect = require('connect'), // Webserver
      server = lr();
      less = require('gulp-less'),
      path = require('path'),
      changed = require('gulp-changed');
      //watch = require('gulp-watch');
const config = {
        server: {
        baseDir: "/"
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
gulp.task('html:build', function () {
    return gulp.src('blocks/**/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(concat('index2.html'))
        .pipe(gulp.dest('dist')) //Выплюнем их в папку build
        .pipe(livereload(server)); //И перезагрузим наш сервер для обновлений
});
gulp.task('css', function () {  
    return gulp.src(['blocks/general/general.less','blocks/**/*.less'])
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
        .pipe(livereload(server)); // даем команду на перезагрузку страницы
});
gulp.task('css:watch', function () {  
    gulp.watch('blocks/**/*.less', gulp.series('css'));
});