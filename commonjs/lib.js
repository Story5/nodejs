console.log('hello lib');

exports.hello = 'world';

exports.add = function (a, b) {
    return a + b;
}

exports.geekbang = { hello: 'world' };

setTimeout(() => { 
    console.log(exports)
}, 2000);