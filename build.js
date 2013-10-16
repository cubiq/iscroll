#!/usr/bin/env node

var pkg = require('./package.json');
var fs = require('fs');
var hint = require("jshint").JSHINT;
var uglify = require('uglify-js');

var banner = '/*! iScroll v' + pkg.version + ' ~ (c) 2008-' + (new Date().getFullYear()) + ' Matteo Spinelli ~ http://cubiq.org/license */\n';

var releases = {
	// Main releases
	lite: {
		files: ['default/_animate.js', 'default/handleEvent.js']
	},

	iscroll: {
		files: [
			'indicator/_initIndicators.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'default/_animate.js',
			'default/handleEvent.js',
			'indicator/indicator.js'
		],
		postProcessing: [ 'indicator/build.json', 'wheel/build.json', 'snap/build.json', 'keys/build.json' ]
	},

	probe: {
		files: [
			'indicator/_initIndicators.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'probe/_animate.js',
			'default/handleEvent.js',
			'indicator/indicator.js'
		],
		postProcessing: [ 'indicator/build.json', 'wheel/build.json', 'snap/build.json', 'keys/build.json', 'probe/build.json' ]
	},

	zoom: {
		files: [
			'indicator/_initIndicators.js',
			'zoom/zoom.js',
			'wheel/wheel.js',
			'snap/snap.js',
			'keys/keys.js',
			'default/_animate.js',
			'zoom/handleEvent.js',
			'indicator/indicator.js'
		],
		postProcessing: [ 'zoom/build.json', 'indicator/build.json', 'wheel/build.json', 'snap/build.json', 'keys/build.json' ]
	}

	// Additional releases TBD
};

var args = process.argv.slice(2);

if ( !args.length ) {
	args = ['iscroll'];
}

if ( args[0] == 'dist' ) {
	args = ['lite', 'iscroll', 'zoom', 'probe'];
}

// Get the list of files
args.forEach(function (release) {
	if ( !(release in releases) ) {
		console.log('Unrecognized release: ' + release);
		return;
	}

	console.log('Building release: ' + release);
	build(release);
});

function build (release) {
	var out = '';
	var value = '';

	var fileList = ['open.js', 'utils.js', 'core.js'];

	fileList = fileList.concat(releases[release].files);

	fileList.push('close.js');

	// Concatenate files
	out = banner + fileList.map(function (filePath) {
				return fs.readFileSync('src/' + filePath, 'utf-8');
			}).join('');

	// Update version
	out = out.replace('/* VERSION */', pkg.version);

	// Post processing
	if ( releases[release].postProcessing ) {
		releases[release].postProcessing.forEach(function (file) {
			var postProcessing = require('./src/' + file);

			// Insert point
			for ( var i in postProcessing.insert ) {
				value = postProcessing.insert[i].substr(postProcessing.insert[i].length-3) == '.js' ? 
					fs.readFileSync('src/' + postProcessing.insert[i]) :
					postProcessing.insert[i];

				out = out.replace('// INSERT POINT: ' + i, value + '\n\n// INSERT POINT: ' + i );
			}

			// Replace
			for ( i in postProcessing.replace ) {
				value = postProcessing.replace[i].substr(postProcessing.replace[i].length-3) == '.js' ?
					fs.readFileSync('src/' + postProcessing.replace[i]) :
					postProcessing.replace[i];

				var regex = new RegExp('\\/\\* REPLACE START: ' + i + ' \\*\\/[\\s\\S]*\\/\\* REPLACE END: ' + i + ' \\*\\/');
				out = out.replace(regex, '/* REPLACE START: ' + i + ' */' + value + '/* REPLACE END: ' + i + ' */');
			}
		});
	}

	// Write build file
	var buildFile = './build/iscroll' + (release != 'iscroll' ? '-' + release : '') + '.js';
	fs.writeFileSync(buildFile, out);

	// JSHint
	if ( !hint(out) ) {
		var lines = out.split('\n');
		hint.errors.forEach(function (err) {
			console.log('\033[31m[' + err.code + ']\033[0m ' + err.line + ':' + err.character + '\t- ' + err.reason);
			console.log('\033[33m' + lines[err.line-1].replace(/\t/g, ' ') + '\033[0m\n');
		});

		process.exit();
	}

	// Write dist file
	var distFile = buildFile.replace('/build/', '/dist/').replace('.js', '-min.js');
	out = uglify.minify(out, { fromString: true });
	fs.writeFileSync(distFile, banner + out.code);
}
