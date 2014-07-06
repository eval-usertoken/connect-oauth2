/**
 * OAuth Routes
 * - checks if the request is in the list of accepted routes
**/

var Routes = function( options ){

	options = options || {};

	// class options
	this.options = {
		routes: options.routes,
		host: options.host,
		auth: options.auth,
		api: options.api
	}

}

Routes.prototype = {

	constructor: Routes,

	valid: function( req, res ){
		// get host and path (error control?)
		var host = req.host;
		var path = req.path;

		if( this.options.host ){
			var valid_host = ( this.options.host.indexOf( host ) > -1 );
			// no need to proceed further
			if( !valid_host ) return false;
		}

		if( this.options.routes ){
			// check api first (as it is a more common occurance)
			if( this.options.api ){
				var valid_api = ( this.options.api.indexOf( path ) > -1 );
				// found an api endpoint we're good...
				if( valid_api ) return true;
			}
			// secondly, check the auth endpoints
			for( var i in this.options.auth ){
				var uri = this.options.auth[i];
				var valid_auth = ( uri.indexOf( path ) > -1 );
				// on the first valid endpoint, exit
				if( valid_auth ) return true;
			}
			// no valid route found
			return false;
		}
		// all test passed...
		return true;
	}

}

module.exports = Routes;