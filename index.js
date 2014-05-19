/* global require: false, console: false */
'use strict';

var express  = require( 'express' );
var mongoose = require( 'mongoose' );
var connect  = require('connect');
var app      = express();
var session      = require ('express-session');
var cookieParser = require( 'cookie-parser' );
var bodyParser = require('body-parser');
var utils    = require( './utils' );
var config   = require( './config' );

mongoose.connect( utils.mongoUrl( config.db ) );

mongoose.connection.on( 'open', function () {
	console.log( 'Connection to mongodb is open' );
} );

mongoose.connection.on( 'error', function ( error ) {
	console.log( 'Error on mongodb connection : ', error );
} );

app.use( connect.bodyParser() );
app.use( express.static('public/') );
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));


app.use( '/', require( './controller/ConfessionsController' ) );
app.use( '/', require( './controller/AdminController' ) );

app.get( '/', function( request, response) {
	response.sendfile( "index.html" );
} );
app.get( '/adminPage', checkAuth, function( request, response ) {

	response.sendfile( __dirname + "/public/adminpage.html" );
} );
app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/#login');
});
function checkAuth(req, res, next) {
	console.log( req.session.user_id );
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}
app.listen( config.port, config.host );

module.exports = app;