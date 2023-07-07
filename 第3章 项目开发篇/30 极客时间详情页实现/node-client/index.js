const mount = require('koa-mount');
const static = require('koa-static')
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('./template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(
    mount('/static', static(`${__dirname}/source/static/`))
)

app.use(async (ctx) => {
    const result = await new Promise((resolve, reject) => {
        rpcClient.write({
            columnid: ctx.query.columnid
        }, function (err, data) {
            err ? reject(err) : resolve(data);
            console.log(err, data);
        })
    })

    ctx.status = 200;
    ctx.body = detailTemplate(result);
})

app.listen(3000)