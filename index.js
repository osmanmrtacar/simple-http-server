const net = require('net');
const fs = require('fs');

const server = net.createServer();

const handleRequest = async (path) => {
  let requestedFile = `${path}.html`;
  if (path === '/') {
    requestedFile = '/index.html';
  }
  const fileData = await fs.promises.readFile(`.${requestedFile}`);
  return fileData;
};

server.on('connection', (socket) => {
  console.log('client connected');

  socket.on('data', async (data) => {
    const [requestHeader] = data.toString().split('\n\n');

    const [requestLine] = requestHeader.split('\n');

    const [method, path, httpVersion] = requestLine.split(' ');

    const fileData = await handleRequest(path);

    const header = 'HTTP/1.1 200 OK\nServer: SimpleHTTPServer Nodejs\n\n';
    socket.write(header);

    socket.write(fileData);

    socket.end();
  });
});

server.listen(9090, () => {
  console.log('Listening 9090');
});
