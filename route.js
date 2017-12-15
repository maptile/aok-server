const Koa = require('koa');
const koaRoute = require('koa-route');
const staticFile = require('koa-static');
const mount = require('koa-mount');

class Route{
    constructor(app){
        this.app = app;
    }

    get(path, action){
        this.app.use(koaRoute.get(path, action));
    }

    post(path, action){
        this.app.use(koaRoute.post(path, action));
    }

    delete(path, action){
        this.app.use(koaRoute.delete(path, action));
    }

    options(path, action){
        this.app.use(koaRoute.options(path, action));
    }

    static(path, staticFilePath){
        if(typeof staticFilePath === 'undefined'){
            staticFilePath = path;
            path = undefined;
        }

        const assetApp = new Koa();
        assetApp.use(staticFile(staticFilePath));

        if(path){
            this.app.use(mount(path, assetApp));
        } else {
            this.app.use(mount(assetApp));
        }
    }
}

module.exports = Route;
