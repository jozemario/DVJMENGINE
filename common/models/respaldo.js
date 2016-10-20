'use strict';
// Require spawn from the child process module
var cp = require('child_process');

module.exports = function(Respaldo) {


  Respaldo.getSchemaTables = function (cb) {

        var output = {};
        // Run node with the child.js file as an argument
          var child = cp.fork('workers/getTablas/eventTest.js');

          child.on('message', function (m){
            console.log('PARENT got message:', m);
           output = {
             msj: m
           };
           cb(null, output);
        });
          child.send({ msj: 'backup' });

          // Listen for an exit event:
          child.on('exit', function (exitCode) {
            console.log("Child exited with code: " + exitCode);
          });

}
Respaldo.remoteMethod(
  'getSchemaTables',
  {
    http: {path: '/getSchemaTables', verb: 'get'},
    returns: {arg: 'getSchemaTables', type: 'string'}
    //returns: {arg: 'getSchemaTables', type: 'object', 'http': {source: 'res'}}

  }
)

};
