// (function () {
//     const result = async function () {
//         try {
//             var content = await new Promise((reslove, reject) => {
//                 setTimeout(() => {
//                     reject(new Error('8'));
//                 }, 500);
//             })
//         } catch (e) {
//             console.log('error', e.message);
//         }
//         console.log(content);
//         return 4;
//     }();

//     setTimeout(() => {
//         console.log(result);
//     }, 800);
// })();

// console.log(function () {
//     return new Promise((reslove, reject) => {
//         reject(new Error('4'));
//     });
// }())

function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve('success');
            } else {
                var error = new Error('fail');
                error.round = round;
                reject(error);
            }
        }, 500);
    });
}

// (async function () {
//     try {
//         await interview(1);
//         await interview(2);
//         await interview(3);

//     } catch (e) {
//         return console.log('cry at ' + e.round);

//     }
//     console.log('smile');
// })()

(async function () {
    try {
        await Promise.all([
            interview(1),
            interview(2),
        ])
    } catch (e) {
        return console.log('cry at ' + e.round);
    }
    console.log('smile');
})()