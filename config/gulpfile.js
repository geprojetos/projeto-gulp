var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    plumber         = require('gulp-plumber'),
    jade            = require('gulp-jade'),
    htmlmin         = require('gulp-htmlmin'),
    sass            = require('gulp-sass'),
    cmq             = require('gulp-combine-mq'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssmin          = require('gulp-cssmin'),
    csslint         = require('gulp-csslint'),
    inlinesource    = require('gulp-inline-source'),
    concat          = require('gulp-concat'),
    gulpIf          = require('gulp-if'),
    imagemin        = require('gulp-imagemin'),
    uglify          = require('gulp-uglify'),
    clean           = require('gulp-clean');

    
// var environment = "development";
function dev () {
    return environment === 'development';
};

function prod () {
    return environment === 'production';
};

// src
const srcJade = {
    pages: '../src/jade/pages/home/index.jade',
    all: '../src/jade/pages/**/*.jade'
};

const srcScss = {
    base: '../src/scss/base/*.scss',
    layout: '../src/scss/layout/*.scss',
    module: '../src/scss/module/*.scss',
    state: '../src/scss/state/*.scss',
    theme: '../src/scss/theme/*.scss',
    abouveDefault: '../src/scss/abouve-default.scss',
    style: '../src/scss/style.scss'
};

const srcImages = {
    all: '../src/images/**/*'
};

const srcJs = {
    inline: ['../src/js/inline/*.js'],
    lib: ['../src/lib/*.js']
}

// tmp
const tmp = {
    html: '../public/_tmp/',
    htmlAll: '../public/_tmp/*.html',
    css: '../public/_tmp/_css/',
    cssLint: '../public/_tmp/_lint/',
    abouveCss: '../public/_tmp/_css/abouve-default.css',
    styleCss: '../public/_tmp/_css/style.css',
    images: '../public/_tmp/_images/',
    imagesAll: '../public/_tmp/_images/**/*',
    js: '../public/_tmp/_js',
    jsInline: '../public/_tmp/_js/inline.js',
    lib: '../public/_tmp/_lib/',
    libAll: '../public/_tmp/_lib/*.js'
};

// watch
const watch = {
    html: tmp.htmlAll,
    abouveCss: tmp.abouveCss,
    styleCss: tmp.styleCss,
    images: tmp.imagesAll,
    jsInline: tmp.jsInline,
    lib: tmp.lib
};

// development
const development = {
    folder: '../public/',
    all: '../public/**/*',
    html: '../public/*.html',
    css: '../public/css/',
    cssAll: '../public/css/*.css',
    images: '../public/images',
    js: '../public/js',
    lib: '../public/lib'
};

const build = {
    folder: '../build/',
    css: '../build/css',
    images: '../build/images',
    lib: '../build/lib'
};




// task clear
gulp.task('clean', function() {
    return gulp.src([development.folder, build.folder])
        .pipe(clean({force: true}))
});




// task compile
gulp.task('compile-jade', function () {
    return gulp.src(srcJade.pages)
        .pipe(plumber())
        .pipe(jade({ pretty: true }))        
        .pipe(gulp.dest(tmp.html));
});

gulp.task('compile-abouveDefault', function(){
    
    return gulp.src(srcScss.abouveDefault)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cmq({log: true,beautify: true}))
        .pipe(gulp.dest(tmp.css))
});

gulp.task('compile-style', function(){
    return gulp.src(srcScss.style)
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cmq({
            log: true,
            beautify: true
        }))
        .pipe(gulp.dest(tmp.css));
});

gulp.task('compile-images', function() {
    return gulp.src(srcImages.all)
        .pipe(gulp.dest(tmp.images))
});

gulp.task('compile-jsInline', function() {
    return gulp.src(srcJs.inline)
        .pipe(plumber())
        .pipe(concat('inline.js'))
        .pipe(gulp.dest(tmp.js))
});

gulp.task('compile-lib', function() {
    return gulp.src(srcJs.lib)
        .pipe(gulp.dest(tmp.lib))
});




// task lint
gulp.task('lint-css', ['compile-abouveDefault', 'compile-style'], function() {
    csslint.addFormatter('csslint-stylish');
    
    return gulp.src([
            srcScss.base, 
            srcScss.module, 
            srcScss.state,
            srcScss.theme,
            srcScss.layout,
        ])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(tmp.cssLint))
        .pipe(csslint())
        .pipe(csslint.formatter('stylish'))
});



// task development
gulp.task('development-html', ['compile-jade', 'compile-abouveDefault', 'compile-jsInline'], function () {
    return gulp.src(tmp.htmlAll)
        .pipe(inlinesource())
        .pipe(gulpIf(dev(), gulp.dest(development.folder)))
        
        .pipe(gulpIf(prod(), htmlmin({ collapseWhitespace: true })))
        .pipe(gulpIf(prod(), gulp.dest(build.folder)))
});

gulp.task('development-style', ['compile-style'], function () {
   return gulp.src(tmp.styleCss)
        .pipe(gulpIf(dev(), gulp.dest(development.css)))

        .pipe(gulpIf(prod(), cssmin()))
        .pipe(gulpIf(prod(), gulp.dest(build.css)))
});

gulp.task('development-images', ['compile-images'], function() {
    return gulp.src(tmp.imagesAll)
        .pipe(gulpIf(dev(), gulp.dest(development.images)))
        
        .pipe(gulpIf(prod(), imagemin()))
        .pipe(gulpIf(prod(), gulp.dest(build.images)))
});

gulp.task('development-lib', ['compile-lib'], function() {
    return gulp.src(tmp.libAll)
        .pipe(gulpIf(dev(), gulp.dest(development.lib)))

        .pipe(gulpIf(prod(), uglify()))
        .pipe(gulpIf(prod(), gulp.dest(build.lib)))
});





// task watch
gulp.task('watch-html', function() {
    return gulp.src(watch.html)
        .pipe(inlinesource())
        .pipe(gulp.dest(development.folder))
});

gulp.task('watch-style', function() {
    return gulp.src(watch.styleCss)
        .pipe(gulp.dest(development.css))
});

gulp.task('watch-images', function() {
    return gulp.src(watch.images)
        .pipe(gulp.dest(development.images))
});

gulp.task('watch-jsInline', function() {
    return gulp.src(tmp.jsInline)
        .pipe(gulp.dest(development.js))
});




// task server
gulp.task('server-dev', ['build-dev'], function() {

    browserSync.init({
        server: {
            baseDir: development.folder
        }
    });

    // watch src
    gulp.watch(srcJade.all, ['compile-jade']);
    gulp.watch(
        [
            srcScss.base, 
            srcScss.module, 
            srcScss.state,
            srcScss.theme,
            '../src/scss/layout/header.scss', 
        ], 
        ['compile-abouveDefault', 'lint-css']
    );
    gulp.watch(
        [
            srcScss.base, 
            srcScss.module, 
            srcScss.state,
            srcScss.theme,
            srcScss.style,
            srcScss.layout
        ], 
        ['compile-style']
    );

    gulp.watch(srcImages.all, ['compile-images']);
    gulp.watch(srcJs.inline, ['compile-jsInline']);

    // watch _tmp
    gulp.watch([watch.html, watch.abouveCss, watch.jsInline], ['watch-html']);
    gulp.watch([watch.styleCss], ['watch-style']);
    gulp.watch(watch.images, ['watch-images']);

    // reload
    gulp.watch([
            development.html, 
            development.cssAll
        ]).on('change', browserSync.reload)
});

gulp.task('server-prod', ['build-prod'], function() {

    browserSync.init({
        server: {
            baseDir: build.folder
        }
    });
});




// tasks build
gulp.task('set-production', () => environment = 'production');

gulp.task('set-development', () => environment = 'development');

gulp.task('build-dev', ['set-development', 'development-html', 'development-style', 'development-images', 'development-lib']);

gulp.task('build-prod', ['set-production', 'development-html', 'development-style', 'development-images', 'development-lib']);

gulp.task('dev', ['server-dev']);

gulp.task('prod', ['server-prod']);