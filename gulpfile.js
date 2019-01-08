var gulp = require('gulp');

var sass = require('gulp-sass');

var server = require('gulp-webserver');

// 编译scss
gulp.task('sass',function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/css'))
})
// 监听scss
gulp.task('watch',function(){
	return gulp.watch('./src/scss/*.scss',gulp.series('sass'));
})
// 起服务
gulp.task('server',function(){
	return gulp.src('src')
		.pipe(server({
			port: 9898
		}))
})

//线上
gulp.task('dev',gulp.series('server','watch'));