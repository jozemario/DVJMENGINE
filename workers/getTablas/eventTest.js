// Unpause the stdin stream:
process.stdin.resume();
// Listen for incoming data:
var sql = require("seriate");
var configDb = require('../../server/configDb.js');
sql.setDefaultConfig( configDb );

process.on('message', function (m) {

  switch(m){
    case 'getTablas':{
      sql.execute( {
        query: "SELECT * FROM INFORMATION_SCHEMA.TABLES"
      } ).then( function( results ) {
        console.log( results );
        console.log('CHILD got message:', m);
        console.log(`This process is pid ${process.pid}`);
        process.send({ foo: results });
        process.kill(process.pid);
      }, function( err ) {
        console.log( "Something bad happened:", err );
      } );
    }
    default:{
      console.log('CHILD got message:', m);
      console.log(`This process is pid ${process.pid}`);
      process.send({ foo: 'bar' });
      process.kill(process.pid);
    }
  }



});


