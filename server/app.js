const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const koaStatic = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const routers = require('./routers/index');

app.use(koaStatic(
    path.join(__dirname, './../static')
));

app.use(bodyParser());
app.use(views(path.resolve(__dirname, './views'), {
    extension: 'ejs'
}));

app.use(routers.routes()).use(routers.allowedMethods());

const port = 8081;
app.listen(port, () => {
    console.log(`Server is running at ${port} port...`);
});
