const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const webserver = require("gulp-webserver");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const path = require('path');
const fs = require('fs');
gulp.task("sass", () => {
    return gulp.src("./src/sass/**/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("./src/css"))
});
gulp.task("server", () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            middleware: (req, res, next) => {
                let pathName = url.parse(req, url).pathName;
                if (pathName === './favicon.ico') {
                    res.end("")
                }
                if (pathName === './api/getDate') {
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else {
                    pathName = pathName === '/' ? 'index.html' : pathName
                    res.end(readFileSync(path.Join(__dirname, 'src', pathName)))
                }
            }
        }))
})
gulp.task("devBabel", () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })).pipe(gulp.dest('./src/js.babel'))

})
gulp.task("watching", () => {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.series('sass', 'devBabel'))

})
gulp.task('default', gulp.series("sass", "devBabel", "server", "watching"))
    // gulp.task("myCss", () => {
    //     return gulp.src('./src/css/**/*.css')
    //         .pipe(clean())
    //         .pipe(gulp.dest('./dist/css'))
    // })
gulp.task("coyJs", () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})