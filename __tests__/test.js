const server = require('../index');

server.add('/test', async function(ctx) {
    ctx.body = 'test is ok';
});

server.addStatic('/static', './');

server.add404('oh noooo');

server.listen(3000);