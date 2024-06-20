const data = require('../../data');

module.exports = (req, res) => {
  data.getUsers((err, users) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Failed to retrieve users' }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(users));
    }
  });
};
