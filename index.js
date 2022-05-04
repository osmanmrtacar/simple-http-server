const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('client connected');

  socket.on('data', (data) => {
    console.log(data.toString());
    const header = 'HTTP/1.1 200 OK\nServer: SimpleHTTPServer Nodejs\n\n';
    socket.write(header);

    const body = 'Hello World';
    socket.write(body);

    socket.end();
  });
});

server.listen(9090, () => {
  console.log('Listening 9090');
});
