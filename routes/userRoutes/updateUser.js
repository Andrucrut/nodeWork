const data = require('../../data');

module.exports = (req, res) => {
  const id = parseInt(req.url.split('/')[2]);
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const parseBody = new URLSearchParams(body);
    const updateData = {};
    parseBody.forEach((value, key) => {
      updateData[key] = key === 'age' ? parseInt(value) : value;
    });

    data.updateUser(id, updateData, (err, changes) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Failed to update user' }));
      } else if (changes === 0) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ id, ...updateData }));
      }
    });
  });
};
