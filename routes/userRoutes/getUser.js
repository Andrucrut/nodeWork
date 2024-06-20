const data = require('../../data');

module.exports = (req, res) => {
  const id = parseInt(req.url.split('/')[2]);

  data.getUserById(id, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Failed to retrieve user' }));
    } else if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    }
  });
};
