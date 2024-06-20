const url = require('url');


const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const listUsers = require('./listUsers');

const userRoutes = (req, res) => {
  const parseUrl1 = url.parse(req.url,true);
  const method = req.method;
  const path = parseUrl1.pathname;

  res.setHeader('Content-type', 'application/json');

  if (path === '/users' && method === 'GET') {
    listUsers(req, res);
  } else if (path === '/users' && method === 'POST') {
    createUser(req, res);
  } else if (path.match(/^\/users\/\d+$/) && method === 'GET') {
    getUser(req, res);
  } else if (path.match(/^\/users\/\d+$/) && method === 'PUT') {
    updateUser(req, res);
  } else if (path.match(/^\/users\/\d+$/) && method === 'DELETE') {
    deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

module.exports = userRoutes;
