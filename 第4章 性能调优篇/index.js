const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

const app = new koa();

app.use(
    static(__dirname + '/source')
)
const buffer = fs.readFileSync(__dirname + '/source/index.htm')
app.use(
    mount('/', async (ctx) => {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = buffer
    })
)

app.listen(3000);