define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	return Backbone.Model.extend({
		initialize : function () {
			Backbone.Model.prototype.initialize.apply(this, arguments);
			var error = this.validate(this.attributes);
			if (error) {
				this.trigger('error', this, error);
			}
		},

		url : '/admin',

		'validate' : function ( attr ) {
			if ( ! attr.username ) {
				return 'username must not be empty.';
			}
			if ( ! attr.password ) {
				return 'password must not be empty.';
			}
		}
	} );
} );
