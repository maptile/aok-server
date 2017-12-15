const Server = require('../index');

const server = new Server();
server.route.get('/test', async (ctx) => {
    ctx.body = 'get test ok';
});

server.route.post('/test', async(ctx) => {
    ctx.body = 'post to test ok';
});

server.route.static('/static', './');

server.listen(3000);
