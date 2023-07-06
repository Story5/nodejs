const game = require('./lib');
var playerAction = process.argv[process.argv.length - 1];
// const result = game(playerAction);
// console.log(result);

let count = 0;
process.stdin.on('data', e => {
    const playerAction = e.toString().trim();
    console.log(playerAction);
    const result = game(playerAction);
    console.log(result);
    if (result == -1) {
        count++;
    }
    if (count === 3) {
        console.log('你太厉害了,我不玩儿了!');
        process.exit();
    }
})