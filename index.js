const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Route = require('./route');

class AokServer{
    constructor(){
        this.app = new Koa();
        this.app.use(bodyParser());
        this.route = new Route(this.app);
    }

    listen(port){
        this.app.use((ctx) => {
            ctx.status = 404;
            ctx.body = 'Not Found\n';
        });
        this.app.listen(port);
    }
}

module.exports = AokServer;
