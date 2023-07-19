const cluster = require('cluster');
const os = require('os');
if (cluster.isMaster) {
    console.log('os.cpus().length:', os.cpus().length)
    for (let i = 0; i < os.cpus().length / 2; i++)
        cluster.fork();

} else {
    require('./app')
}