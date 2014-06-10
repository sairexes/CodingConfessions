define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var template = require( 'text!apps/home/templates/LoginPageTemplate.html' );

	return Marionette.ItemView.extend( {

		template : _.template( template ),
		ui       : {
			'username' : '#username',
			'password' : '#password'
		},
		events   : {
			'click #login-btn' : 'login'
		},
		'login'  : function () {

			$.ajax( {
				url     :  '/admin/login',
				type    :  'POST',
				data    :  {
					'username' : this.ui.username.val(),
					'password' : this.ui.password.val()
				},
				success : function ( result ) {

					Backbone.history.navigate( 'admin/' + result._id, { trigger : true, replace : true } );
				},
				error   : function ( error ) {

					Backbone.history.navigate( 'login', { trigger : true, replace : true } );
				}
			});

		}

	} );

} );
