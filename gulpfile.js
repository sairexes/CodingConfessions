var gulp = require('gulp');
var fs   = require('fs');
// include plug-ins
var jshint      = require('gulp-jshint');
var map         = require('map-stream');
var jscs        = require('gulp-jscs');
var Combine     = require('stream-combiner');
var complexity  = require('gulp-complexity');
var jshinterror = 0;

var errorReporter = function ( ) {
	return map(function (file, cb) {
		if ( !file.jshint.success ) {
			jshinterror = 1;
		}
		cb( null, file );
	} );
};

gulp.task( 'hook', [ 'setup' ], function ( ) {
	return fs.chmodSync( '.git/hooks/pre-commit', '755' );
} );

gulp.task( 'setup', function ( ) {
	return fs.readFile( './.precommit', function ( err, data ) {
		if (err) {
			throw err;
		}
		fs.writeFile( '.git/hooks/pre-commit', data, function ( err ) {
			if ( err ) {
				throw err;
			}
			console.log('Setup complete!');
		} )
	} );
} );

gulp.task( 'default', [ 'jshint', 'jscs', 'complexity' ], function () {} );

// JShint task
gulp.task( 'jshint', function ( ) {
	gulp.src('./public/js/apps/**/*.js')
				.pipe( jshint( ) )
				.pipe( jshint.reporter( 'jshint-stylish' ) )
				.pipe( errorReporter( ) )
				.on('end', function ( ) {
					if ( jshinterror === 1 ) {
						console.log( '\n >>> REFUSING COMMIT DUE TO SYNTAX ERRORS <<<' );
						jshinterror = 0;
						process.exit( 1 );
					}
				} );
} );

// JSCS task
gulp.task( 'jscs', function ( ) {
	var combined = Combine( gulp.src( './public/js/apps/**/*.js' )
								.pipe( jscs( ) ) )
	combined.on('error', function ( err ) {
		console.warn( err.message + '\n >>> REFUSING COMMIT DUE TO UNCONVENTIONAL CODING PATTERNS <<<' );
		process.exit( 1 );
	} );
	return combined;
} );

// Complexity task
gulp.task( 'complexity', function ( ) {
	var combined = Combine ( gulp.src('./public/js/apps/**/*.js')
								.pipe( complexity( ) ) )
	combined.on( 'error', function ( err ) {
		console.warn( err.message + '\n >>>REFUSING COMMIT DUE TO HIGH COMPLEXITY<<<' );
		process.exit( 1 );
	} );
	return combined;
} );

// JSCS task for gulp
gulp.task( 'check-gulp', function ( ) {
	var combined = Combine (
		gulp.src( './gulpfile.js' ).pipe( jscs( ) )
	)
	combined.on( 'error', function ( err ) {
		console.warn( err.message + '>>> FOLLOW CODING STANDARDS! <<<' );
		process.exit( 1 );
	} );
	return combined;
} );