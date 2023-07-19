module.exports = {
    '/detail': async function () {
        // rpc
        // render
        return 'detail page'
    },
    '/list': {
        data:async function () {
            return 'list page'
        },
        render:function(){
            
        }
    },
    '/play': function () {
        return 'play page'
    }
}