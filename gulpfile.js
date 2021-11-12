// Sassのコンパイルタスクのサンプルファイルです。
// gulpプラグインの読み込み
const gulp = require("gulp");
gulpPugBeautify = require("gulp-pug-beautify");

gulpif = require("gulp-if");
cleancss = require("gulp-clean-css"); // 圧縮

pug = require("gulp-pug");
pugPHPFilter = require("pug-php-filter");

sass = require("gulp-sass")(require("sass"));
rename = require("gulp-rename");
sourcemaps = require("gulp-sourcemaps"); //scss 検証するため

plumber = require("gulp-plumber");
notify = require("gulp-notify");

isChanged = require("gulp-changed");
imagemin = require("gulp-imagemin");
pngquant = require("imagemin-pngquant");
mozjpeg = require("imagemin-mozjpeg");

babel = require("gulp-babel");
uglify = require("gulp-uglify");
stripDebug = require("gulp-strip-debug");
fileinclude = require("gulp-file-include");

ts = require("gulp-typescript");

browsersync = require("browser-sync").create();

del = require("del");

mode = require("gulp-mode")({
  modes: [
    "local",
    "production",
    "basic",
    "wp_local",
    "wp_production",
    "wp_basic",
  ],
  default: "local",
  verbose: false,
});

postcss = require("gulp-postcss");
autoprefixer = require("autoprefixer");
mmq = require("gulp-merge-media-queries");

isLocal = mode.local();
isProduction = mode.production();
isBasic = mode.basic();
wp_isLocal = mode.wp_local();
wp_isProduction = mode.wp_production();
wp_isBasic = mode.wp_basic();

let path_src;
let path_public;

if (isLocal || isProduction || isBasic) {
  path_src = "./src";
  path_public = "./public";
  path_wp = "./public";
}

//wp path
if (wp_isLocal || wp_isProduction || wp_isBasic) {
  path_src = "./src";
  path_public = "./wp/wp-content/themes/kansei";
  path_wp = "./wp";
}

const paths = {
  del: {
    public: path_public + "/",
    assetsCss: path_public + "/assets/css/**", // flase
    basic: path_wp + "/basic-auth", // true
    htaccess: path_wp + "/.htaccess", // true
  },
  pug: {
    src: path_src + "/page/**/**/*.pug",
    public: path_public + "/",
    except1: "!" + path_src + "/page/**/**/_*.pug",
    except2: "!" + path_src + "/page/**/**/* copy.pug",
  },
  watchComponentsPug: {
    src: path_src + "/components/**/*.pug",
  },
  watchDataPug: {
    src: path_src + "/data/**/*.pug",
  },
  scss: {
    src: path_src + "/assets/scss/**/*.scss",
    public: path_public + "/assets/css/",
    import: path_src + "/assets/scss/",
  },
  wpscss: {
    src: path_src + "/assets/scss/style.scss",
    public: path_public + "/",
    import: path_src + "/",
  },
  images: {
    src: path_src + "/assets/images/**/*.{png,jpg,gif,svg,jpeg}",
    public: path_public + "/assets/images/",
  },
  jsLib: {
    src: path_src + "/assets/js/lib/**/*.js",
    public: path_public + "/assets/js/lib/",
    except: "!" + path_src + "/assets/js/lib/_**/*.js",
    except2: "!" + path_src + "/assets/js/lib/**/_*.js",
  },
  jsBabel: {
    src: path_src + "/assets/js/js/**/**/*.js",
    public: path_public + "/assets/js/",
    except: "!" + path_src + "/assets/js/lib/**/**/*.js",
    except2: "!" + path_src + "/assets/js/js/components/**/**/*.js",
    except3: "!" + path_src + "/assets/js/lib/**/**/_*.ts",
  },
  jsTs: {
    src: path_src + "/assets/js/ts/**/**/*.ts",
    public: path_public + "/assets/js/",
    except: "!" + path_src + "/assets/js/ts/components/**/*.ts",
    except2: "!" + path_src + "/assets/js/ts/**/**/_*.ts",
  },
  htaccess: {
    src: path_src + "/htaccess/.htaccess",
    public: path_wp + "/",
  },
  htaccess_basic: {
    src: path_src + "/htaccess/basic/.htaccess",
    public: path_wp + "/",
  },
  basic: {
    src: path_src + "/basic-auth/.htpasswd",
    public: path_wp + "/basic-auth/",
  },
  screenshot: {
    src: path_src + "/screenshot.*",
    public: path_public + "/",
  },
  other_directory: {
    src: path_src + "/assets/**/*.*",
    public: path_public + "/assets/",
    ignore1: path_src + "/assets/**/_*.*",
    ignore2: path_src + "/assets/**/**/_*.*",
    ignore3: path_src + "/assets/_**/*.*",
    ignore4: path_src + "/assets/**/_**/*.*",
    ignore5: path_src + "/assets/**/* copy.*",
    ignore6: path_src + "/assets/scss/**",
    ignore7: path_src + "/assets/js/**",
    ignore8: path_src + "/assets/images/**",
  },
};
function clean() {
  return del([paths.del.public]);
}
function cleanAssetsCss() {
  return del([paths.del.assetsCss]);
}
function cleanHtaccess() {
  return del([paths.del.htaccess]);
}
function cleanBasic() {
  return del([paths.del.basic]);
}
function pug_php() {
  const option = {
    // pretty: true,
    pretty: "\t",
    basedir: "src",
    filters: {
      php: pugPHPFilter,
    },
  };
  return gulp
    .src([paths.pug.src, paths.pug.except1, paths.pug.except2])
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(pug(option))
    .pipe(
      rename({
        extname: ".php",
      })
    )
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(gulp.dest(paths.pug.public));
}
function scss() {
  return (
    gulp
      .src([
        paths.scss.src,
        "!" + paths.scss.import + "common/**.*",
        "!" + paths.scss.import + "style.scss",
        "!" + paths.scss.import + "**/* copy.scss",
      ])
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: [paths.scss.import], //file import path
          outputStyle: "compressed", //compact compressed
        }).on("error", sass.logError)
      )
      .pipe(
        rename(function (path) {
          path.extname = ".min.css";
        })
      )
      .pipe(
        postcss([
          autoprefixer({
            // ☆IEは11以上、Androidは4.4以上
            // その他は最新2バージョンで必要なベンダープレフィックスを付与する
            overrideBrowserslist: [
              "last 2 versions",
              "ie >= 11",
              "Android >= 4",
            ],
            cascade: false,
          }),
        ])
      )
      .pipe(mmq())
      .pipe(mode.local(sourcemaps.write("."))) // local のみ
      .pipe(mode.wp_local(sourcemaps.write("."))) // local のみ
      // .pipe(sourcemaps.write('.')) //ソースマップを書き出します
      .pipe(gulp.dest(paths.scss.public))
  );
}
function wpscss() {
  return (
    gulp
      .src([paths.wpscss.src, "!" + paths.wpscss.import + "**/* copy.scss"])
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: [paths.wpscss.import], //file import path
          outputStyle: "compressed", //compact compressed
        }).on("error", sass.logError)
      )
      .pipe(
        rename(function (path) {
          path.extname = ".css";
        })
      )
      .pipe(
        postcss([
          autoprefixer({
            // ☆IEは11以上、Androidは4.4以上
            // その他は最新2バージョンで必要なベンダープレフィックスを付与する
            overrideBrowserslist: [
              "last 2 versions",
              "ie >= 11",
              "Android >= 4",
            ],
            cascade: false,
          }),
        ])
      )
      .pipe(mmq())
      .pipe(mode.local(sourcemaps.write("."))) // local のみ
      .pipe(mode.wp_local(sourcemaps.write("."))) // local のみ
      // .pipe(sourcemaps.write('.')) //ソースマップを書き出します
      .pipe(gulp.dest(paths.wpscss.public))
  );
}
function compressedcss() {
  return (
    gulp
      .src([
        paths.wpscss.public + "**/**.css",
        "!" + paths.scss.public + "lib/**/**.css",
      ])
      .pipe(mode.production(cleancss()))
      .pipe(mode.wp_production(cleancss()))
      // .pipe(mode.production(cleancss({level: {1: {specialComments: 'all'}}})))
      // .pipe(cleancss())
      .pipe(gulp.dest(paths.wpscss.public))
  );
}
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(isChanged(paths.images.public))
    .pipe(
      imagemin([
        pngquant("65-80"), // 配列を渡すと文字列を渡すようにエラーが出たので画質のみを設定
        mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle(),
      ])
    )
    .pipe(gulp.dest(paths.images.public));
}

function jsLib() {
  return gulp
    .src([paths.jsLib.src, paths.jsLib.except, paths.jsLib.except2])
    .pipe(gulp.dest(paths.jsLib.public));
}
function jsBabel() {
  return gulp
    .src([
      paths.jsBabel.src,
      paths.jsBabel.except,
      paths.jsBabel.except2,
      paths.jsBabel.except3,
    ])
    .pipe(
      fileinclude({
        prefix: "!",
      })
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(mode.production(stripDebug()))
    .pipe(mode.production(uglify()))
    .pipe(mode.wp_production(stripDebug()))
    .pipe(mode.wp_production(uglify()))
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(gulp.dest(paths.jsBabel.public));
}
function jsTs() {
  return (
    gulp
      .src([paths.jsTs.src, paths.jsTs.except, paths.jsTs.except2])
      .pipe(ts())
      .pipe(
        babel({
          presets: ["@babel/preset-env"],
        })
      )
      .pipe(mode.production(uglify()))
      .pipe(mode.wp_production(uglify()))
      // .pipe(mode.production(rename({extname: '.js'})))
      // .pipe(uglify())
      .pipe(
        rename({
          extname: ".min.js",
        })
      )
      .pipe(gulp.dest(paths.jsTs.public))
  );
}
function htaccess() {
  return gulp.src(paths.htaccess.src).pipe(gulp.dest(paths.htaccess.public));
}
function htaccess_basic() {
  return gulp
    .src(paths.htaccess_basic.src)
    .pipe(gulp.dest(paths.htaccess_basic.public));
}
function basic() {
  return gulp.src(paths.basic.src).pipe(gulp.dest(paths.basic.public));
}
function screenshot() {
  return gulp
    .src(paths.screenshot.src)
    .pipe(gulp.dest(paths.screenshot.public));
}
function other_directory() {
  return gulp
    .src([paths.other_directory.src], {
      ignore: [
        paths.other_directory.ignore1,
        paths.other_directory.ignore2,
        paths.other_directory.ignore3,
        paths.other_directory.ignore4,
        paths.other_directory.ignore5,
        paths.other_directory.ignore6,
        paths.other_directory.ignore7,
        paths.other_directory.ignore8,
      ],
    })
    .pipe(gulp.dest(paths.other_directory.public));
}

function watchFiles() {
  gulp.watch(paths.pug.src, gulp.series(pug_php));
  gulp.watch(paths.watchComponentsPug.src, gulp.series(pug_php));
  gulp.watch(paths.watchDataPug.src, gulp.series(pug_php));
  gulp.watch(paths.scss.src, gulp.series(cleanAssetsCss, scss));
  gulp.watch(paths.images.src, gulp.series(images));
  gulp.watch(paths.jsLib.src, gulp.series(jsLib));
  gulp.watch(paths.jsBabel.src, gulp.series(jsBabel));
  gulp.watch(paths.jsTs.src, gulp.series(jsTs));
}
function wp_watchFiles() {
  gulp.watch(paths.pug.src, gulp.series(pug_php));
  gulp.watch(paths.watchComponentsPug.src, gulp.series(pug_php));
  gulp.watch(paths.watchDataPug.src, gulp.series(pug_php));
  gulp.watch(paths.scss.src, gulp.series(cleanAssetsCss, scss));
  gulp.watch(paths.scss.src, gulp.series(wpscss));
  gulp.watch(paths.images.src, gulp.series(images));
  gulp.watch(paths.jsLib.src, gulp.series(jsLib));
  gulp.watch(paths.jsBabel.src, gulp.series(jsBabel));
  gulp.watch(paths.jsTs.src, gulp.series(jsTs));
}

// export tasks
exports.clean = clean;
exports.cleanAssetsCss = cleanAssetsCss;
exports.cleanHtaccess = cleanHtaccess;
exports.cleanBasic = cleanBasic;
exports.pug_php = pug_php;
exports.scss = scss;
exports.wpscss = wpscss;
exports.compressedcss = compressedcss;
exports.images = images;
exports.jsLib = jsLib;
exports.jsBabel = jsBabel;
exports.jsTs = jsTs;
exports.htaccess = htaccess;
exports.htaccess_basic = htaccess_basic;
exports.basic = basic;
exports.screenshot = screenshot;
exports.other_directory = other_directory;

const localBasic = gulp.series(
  clean,
  cleanHtaccess,
  cleanBasic,
  gulp.parallel(htaccess_basic, basic)
);
const local = gulp.series(
  clean,
  cleanHtaccess,
  cleanBasic,
  gulp.parallel(pug_php, scss, images, jsLib, jsBabel, jsTs, other_directory)
);
const production = gulp.series(
  clean,
  cleanHtaccess,
  cleanBasic,
  gulp.parallel(pug_php, scss, images, jsLib, jsBabel, jsTs, other_directory),
  compressedcss
);
const watch = gulp.parallel(watchFiles);

const wp_local = gulp.series(
  clean,
  cleanHtaccess,
  cleanBasic,
  gulp.parallel(
    pug_php,
    scss,
    wpscss,
    images,
    jsLib,
    jsBabel,
    jsTs,
    other_directory,
    screenshot,
    htaccess
  )
);
const wp_production = gulp.series(
  clean,
  cleanHtaccess,
  cleanBasic,
  gulp.parallel(
    pug_php,
    scss,
    wpscss,
    images,
    jsLib,
    jsBabel,
    jsTs,
    other_directory,
    screenshot,
    htaccess
  ),
  compressedcss
);
const wp_watch = gulp.parallel(wp_watchFiles);

if (isLocal) {
  gulp.task("default", gulp.series(local, watch));
}
if (isProduction) {
  gulp.task("default", gulp.series(production, watch));
}

if (wp_isLocal) {
  gulp.task("default", gulp.series(wp_local, wp_watch));
}
if (wp_isProduction) {
  gulp.task("default", gulp.series(wp_production, wp_watch));
}
if (isBasic) {
  gulp.task("default", gulp.series(localBasic));
}
if (wp_isBasic) {
  gulp.task("default", gulp.series(localBasic));
}
