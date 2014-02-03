var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  gutil = require('gulp-util');

gulp.task('mocha', function () {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(plugins.mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

gulp.task('watch', function () {
  gulp.src(['lib/**', 'test/**'], { read: false })
    .pipe(plugins.watch(function (events, cb) {
      gulp.run('mocha', cb);
    }));
});

gulp.task('default', ['mocha', 'watch']);
