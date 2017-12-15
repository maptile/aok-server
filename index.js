const Koa = require('koa');
const route = require('koa-route');
const staticFile = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');

const app = new Koa();

app.use(bodyParser());

module.exports = {
    add: function(path, action){
        app.use(route.get(path, action));
    },
    addStatic: function(path, staticFilePath){
        if(typeof staticFilePath === 'undefined'){
            staticFilePath = path;
            path = undefined;
        }

        const assetApp = new Koa();
        assetApp.use(staticFile(staticFilePath));

        if(path){
            app.use(mount(path, assetApp));
        } else {
            app.use(mount(assetApp));
        }
    },
    add404: function(message){
        app.use((ctx) => {
            ctx.status = 404;
            ctx.body = message;
        });
    },
    listen: function(port){
        app.listen(port);
        console.log(`listening on port ${port}`);
    }
};
