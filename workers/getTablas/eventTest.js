// Unpause the stdin stream:
process.stdin.resume();
// Listen for incoming data:
var sql = require("seriate");
var configDb = require('../../server/configDb.js');
sql.setDefaultConfig( configDb );

process.on('message', function (m) {
  console.log('CHILD got message:', m);
  console.log(`This process is pid ${process.pid}`);
  process.send({ foo: 'bar' });
  process.kill(process.pid);
});

