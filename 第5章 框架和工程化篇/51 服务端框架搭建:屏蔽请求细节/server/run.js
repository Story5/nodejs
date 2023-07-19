const mount = require('koa-mount');
const createTemplate = require('./create-template');
const requestFactory = require('./request-factory')
module.exports = function () {
    const koa = new (require('koa'));

    Object.keys(app).forEach(routepath => {
        const dataConfig = app[routepath].data;
        const requests = Object.keys(dataConfig)
            .reduce((ret, key) => {
                ret[key] = requestFactory(dataConfig[key]);
                return ret;
            }, {})
            const template = createTemplate(app[routepath].template);
        koa.use(
            mount(routepath, async (ctx) => {
                ctx.status = 200;
                const result = {};
                await Promise.all(
                    Object.keys(requests).map(key=>{
                        return requests[key](ctx.query)
                        .then(res=>{
                            result[key] = res;
                            return res;
                        })
                    })
                )
                ctx.body = template(result);
            })
        )
    })

    koa.listen(3000);
}