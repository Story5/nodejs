(function () {
    // var promise = new Promise(function (reslove, reject) {
    //     setTimeout(() => {
    //         // reslove(3);
    //         reject(new Error('3'));
    //     }, 300);
    // }).then(function (res) {
    //     console.log(res);
    // }).catch(function (err) {
    //     console.log(err);
    // });

    // console.log(promise);
    // setTimeout(() => {
    //     console.log(promise);
    // }, 800);

    // var promise = interview(1)
    //     .then(() => {
    //         return interview(2)
    //     })
    //     .then(() => {
    //         return interview(3)
    //     })
    //     .then(() => {
    //         console.log('smile')
    //     })
    //     .catch((err)=>{
    //         console.log('cry at ' + err.round + ' round');
    //     });

    // var promise2 = promise.then(res => {
    //     // throw new Error('refuse');
    //     // return 'accept';
    //     return new Promise(function (reslove, reject) {
    //         setTimeout(() => {
    //             reslove('accept');
    //         }, 300);

    //     })
    // }).catch(err => {
    //     // return 'cry';
    //     throw new Error('cry');
    // })
    // setTimeout(() => {
    //     console.log(promise);
    //     console.log(promise2);
    // }, 800);
    // setTimeout(() => {
    //     console.log(promise);
    //     console.log(promise2);
    // }, 1000);

    Promise.all([
        interview('geekbang'),
        interview('tencent'),
    ]).then(() => {
        console.log('smile');
    }).catch((err) => {
        console.log('cry for ' + err.name);
    });
})();

function interview(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve('success');
            } else {
                var error = new Error('fail');
                error.name = name;
                reject(error);
            }
        }, 500);
    });
}