
const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");

clean = () => {
    return del("dist/*");
}

styles = () => {
    return src("src/css/**/*.css")
        .pipe(dest("dist/static/styles/"));
}
pages = () => { 
    return src("src/ejs/**/*.ejs")
        .pipe(dest("dist/views/"));
}
scripts = () => { 
    return src("src/js/**/*.js")
        .pipe(dest("dist/static/scripts/"));
}
update = () => {
    watch("src/css/**/*.css", styles);
    watch("src/ejs/**/*.ejs", pages);
    watch("src/js/**/*.js", scripts);
}


const build = series(clean, parallel(styles, scripts, pages));

exports.pages = pages;
exports.scripts = scripts;
exports.styles = styles;
exports.watch = update;
exports.build = build;
exports.default = build;