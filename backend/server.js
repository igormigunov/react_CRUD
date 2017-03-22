var restify = require('restify'),
    users = require('./users'),
    port = process.env.PORT || 3001

var server = restify.createServer({
    name: 'RESTFull server'
});

server.use((req, res, next) => {
    console.log(req.method + ' ' + req.url)
    return next()
})

server.use(restify.bodyParser())

server.get('api/users', users.get);
server.get('api/users/:id', users.getByID);
server.patch('api/users/:id', users.patch);
server.put('api/users/:id', users.put);
server.post('api/users', users.post);
server.del('api/users/:id', users.delete);

server.listen(port, function () {
    console.log('api running at ' + port);
});