const app = require('./app');
const koa = new (require('koa'));
const mount = require('koa-mount');

Object.keys(app).forEach(routepath => {
    koa.use(
        mount(routepath, async (ctx) => {
            ctx.status = 200;
            ctx.body = await app[routepath](ctx.query);
        })
    )
})

koa.listen(3000);