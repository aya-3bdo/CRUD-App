const { src, dest, watch, series } = require('gulp');
const css = require('gulp-clean-css');
const terser = require('gulp-terser');
const html = require('gulp-htmlmin');
const sync = require('browser-sync').create();

const cssMinTask = () => { 
	return src('static/styles/**/*.css')
		.pipe(css())
		.pipe(dest('dist'));
};
const htmlMinTask = () => { 
	return src('*.html')
		.pipe(html({ collapseWhitespace: true }))
		.pipe(dest('dist'));
};

const jsTerserTask = () => {
	return src('static/scripts/**/*.js')
		.pipe(terser())
	.pipe(dest('dist'));
	
}
const browserSyncServerTask = (cb) => {
	sync.init({
		server: {
			baseDir: '.'
		}
	});
	cb();
};


const browserSyncReloadTask = (cb) => {
	sync.reload();
	cb();
};

const watchTasks = () => {
	watch('*.html', browserSyncReloadTask);
	watch(['dist/styles/**/*.css','dist/scripts/**/*.js', '*.html'], series(cssMinTask, jsTerserTask, htmlMinTask,browserSyncReloadTask));
};

exports.default = series(
	htmlMinTask,
	cssMinTask,
	jsTerserTask,
	browserSyncServerTask,
	watchTasks
);