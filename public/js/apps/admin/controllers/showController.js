define( function ( require ) {
	'use strict';

	var App                       = require( 'App' );
	var Marionette                = require( 'marionette' );
	var classies                  = require( 'classie' );

	App.module( 'Admin.Controller', function ( Controller ) {
		/*var layout = new App.Admin.Views.PageLayout();
		App.content.show( layout );
		Controller.Show = {

			'showLoginPage' : function () {
				var a      = new ConfessionsCollection();

				a.fetch( {
					success : function ( data ) {
						var confessions = new App.Admin.Views.ConfessionsCollectionView( {
							collection : data
						} );
						layout.trendingRegion.show( confessions );
						layout.submissionRegion.show( new SubmissionItemView() );
						console.log('the history' + Backbone.history.length);
					}
				} );
			},

			'showConfession' : function ( id ) {

				var a = new ConfessionsCollection();
				a = new a.model();
				a.fetch( {

					url : '/confessions/' + id ,

					success : function ( data ) {
						classies.remove( $( '#msgOverlay' )[0], 'overlay-closed' );
						classies.remove( $( '.wrapper' )[0], 'sendtoForward' );
						classies.add( $( '#msgOverlay' )[0], 'overlay-open' );
						classies.add( $( '.wrapper' )[0], 'sendtoBack');

						var confession = new App.Admin.Views.ModalItemView( { model : data } );
						layout.modalRegion.show( confession );

					},
					error : function () {
						alert( 'An error has occured! Please try again later.' );
					}

				} );

			}

		};*/

	} );

} );
