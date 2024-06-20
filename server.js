const http = require('http');
const routeHandler = require('./routes/router');

const server = http.createServer(routeHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log('Server running at http://localhost:3001/');
});
