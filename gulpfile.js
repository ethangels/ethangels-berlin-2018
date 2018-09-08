var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('sass', function(){
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('assets/css'))
});

gulp.task('watch', function(){
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    // Other watchers
})