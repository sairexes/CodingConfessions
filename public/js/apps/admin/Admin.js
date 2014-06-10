define( function ( require ) {
	'use strict';

	return function () {

		var $        = require( 'jquery' );
		var Backbone = require( 'backbone' );
		var App      = require( 'App' );
		var Router   = require( 'Router' );

		App.module( 'Admin', function ( Admin ) {

			Admin.Router = Router.extend( {
				'appRoutes' : {
					'admin/:id' : 'showAdminPage'
				}
			} );

			var API = {

				'showAdminPage' : function ( id ) {
					console.log ( id );
				}

			};

			App.addInitializer( function () {
				new Admin.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
