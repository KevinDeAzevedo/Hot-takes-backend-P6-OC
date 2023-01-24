const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Server lancé');
});

server.listen(process.env.PORT || 3000);

