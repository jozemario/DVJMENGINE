 var sql = require("seriate");
 sql.setDefaultConfig( configDb );

 sql.execute( {
 query: "SELECT * FROM INFORMATION_SCHEMA.TABLES"
 } ).then( function( results ) {
 console.log( results );
 }, function( err ) {
 console.log( "Something bad happened:", err );
 } );
