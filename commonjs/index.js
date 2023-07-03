console.log('start require');
var lib = require('./lib.js');
console.log('end require',lib);
console.log(lib.add);
lib.additional = 'test'