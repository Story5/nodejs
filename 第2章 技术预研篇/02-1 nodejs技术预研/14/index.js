// try {
// interview(function (res) {
//     if (res) {
//         return console.log('cry');
//     }
//     console.log('smile');
// });
// } catch (error) {
//     console.log('cry', error);
// }

function interview(callback) {
    setTimeout(() => {
        if (Math.random() < 0.8) {
            callback(null, 'success');
        } else {
            callback(new Error('fail'));
        }
    }, 500);
}

// interview(function (err) {
//     if(err) {
//         return console.log('cry at 1st round');
//     }
//     interview(function(err) {
//         if(err) return console.log('cry at 2nd round');

//         interview(function(err) {
//             if(err) return console.log('cry at 3rd round');
//             console.log('smile');
//         })
//     })
// })

var count = 0;
interview(function(err){
    if(err) return console.log('cry')
    count++
})
interview(function(err){
    if(err) return console.log('cry')
    count++
})