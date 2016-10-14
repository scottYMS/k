var gulp = require("gulp"),
    less = require("gulp-less"),
    mincss = require("gulp-minify-css"),
    gulplog = require("gulp-notify"),
    sourcemaps = require('gulp-sourcemaps');
    gulpPlumber = require("gulp-plumber");

gulp.task("testLess",function(){
    gulp.src('css/*.less')
        .pipe(gulpPlumber({errorHandler: gulplog.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(mincss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
});

gulp.task('testWatch', function () {
    gulp.watch('css/*.less', ['testLess']);
});