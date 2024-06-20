const data = require('../../data');

module.exports = (req, res) => {
  const id = parseInt(req.url.split('/')[2]);

  data.deleteUser(id, (err, changes) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Failed to delete user' }));
    } else if (changes === 0) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200);
      res.end();
    }
  });
};
