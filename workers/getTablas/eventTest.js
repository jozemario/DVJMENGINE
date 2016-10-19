// Unpause the stdin stream:
process.stdin.resume();
// Listen for incoming data:
var sql = require("seriate");
var configDb = require('./../../server/configDb.js');
console.log('configDb', configDb);
sql.setDefaultConfig( configDb );

process.on('message', function (m) {
 // console.log(m);
 // console.log(m.hello);
  switch(m.msj){
    case "world":{
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
        console.log(`This process is pid ${process.pid}`);
        process.send({ foo: err });
        process.kill(process.pid);
        } );
      break;
    }
    case "backup":{
      sql.execute( {
        procedure: "lvRespaldoDB",
      } ).then( function( results ) {
        console.log( results );
        console.log('CHILD got message:', m);
        console.log(`This process is pid ${process.pid}`);
        process.send({ foo: results });
        process.kill(process.pid);
      }, function( err ) {
        console.log( "Something bad happened:", err );
        console.log(`This process is pid ${process.pid}`);
        process.send({ foo: err });
        process.kill(process.pid);
      } );
      break;
    }
    default:{
      console.log('CHILD got message:', m);
      console.log(`This process is pid ${process.pid}`);
      process.send({ foo: 'bar' });
      process.kill(process.pid);
    }
  }



});


