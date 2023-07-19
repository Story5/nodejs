const cluster = require('cluster');
if (cluster.isMaster) {
    const worker = cluster.fork();
    let missedPing = 0;
    let inter = setInterval(() => {
        console.log('ping')
        worker.send('ping')
        missedPing++;
        if (missedPing >= 3) {
            clearInterval(inter);
            process.kill(worker.process.pid)
            // worker.exit(1);
        }
    }, 300);
    worker.on('message', (msg) => {
        console.log('pong')
        if (msg == ' pong') {
            missedPing--;
        }
    })

    cluster.on('exit', () => {
        setTimeout(() => {
            cluster.fork();
        }, 5000);

    })

} else {
    require('./app')
    process.on('message', (str) => {
        if (str == 'ping') {
            process.send('pong')
        }
    })
    process.on('uncaughtException', (err) => {
        console.error(err);
        process.exit(1);
    })
    setInterval(() => {
        console.log(process.memoryUsage().rss)
        if (process.memoryUsage().rss > 734003200) {
            console.log('oom');
            process.exit(1);
        }
    }, 5000);
}

