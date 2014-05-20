define( [ 'adminApp', 'adminAppCollections' ], function( ConfessionManager ) {
	var Marionette = require( 'marionette' );

	ConfessionManager.AdminView = Marionette.ItemView.extend( {
		template : "#headerMenu",
		events : {
			"click #logout"            : "logout",
			"click #changeCredentials" : "toggleModal",
			"click #backHome"          : "home"
		},
		toggleModal : function() {
			$( '#myModal' ).modal( 'show' );
		},
		logout : function() {
			window.history.replaceState( {}, '', '' );
		},
		home : function() {
			window.location = "http://localhost:3000";
		}
	} );
	ConfessionManager.AdminCredentialsView = Marionette.ItemView.extend( {
		template : "#modalFooterWrapper",
		events : {
			"click #saveChanges" : "save"
		},
		save : function() {
			var username = $( '#username' ).val();
			var password = $( '#password' ).val();
			var id       = $( '#idAdmin' ). val();
			jQuery.ajax({
			    url: '/admin/' + id,
			    type: 'PUT',
			    data: {
			        'password': password,
			        'username': username
			    },
			    success: function( data, textStatus ) {
					$( '#myModal' ).modal( 'hide' );
					alert( "Update Response: " + textStatus );
			    }
			});
		}
	} );
	ConfessionManager.ConfessionView = Marionette.ItemView.extend( {
		template : "#confessions-list",
		events : {
			"click #action" : "action",
			"click #reject" : "reject"
		},
		action : function() {
			alert( "Confession Approved" );
		},
		reject : function() {
			alert( "Confession Rejected" );
		}
	} );
	ConfessionManager.ConfessionsView = Marionette.CollectionView.extend( {
		itemView : ConfessionManager.ConfessionView
	} );
	ConfessionManager.AdminPageView = Marionette.ItemView.extend( {
		template : "#adminPage"
	} );

} );