define( function ( require ) {
	'use strict';

	var AdminModel = require( 'apps/admin/models/AdminModel' );

	return Backbone.Collection.extend( {
		model : AdminModel,
		url   : '/admin'
	} );

} );
