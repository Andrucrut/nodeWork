const data = require('../../data');

module.exports = (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const parseBody = new URLSearchParams(body);
    const name = parseBody.get('name');
    const age = parseBody.get('age');

    if (name && age) {
      const user = { name, age: parseInt(age) };
      data.addUser(user, (err, newUser) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ message: 'Failed to add user' }));
        } else {
          res.writeHead(200);
          res.end(JSON.stringify(newUser));
        }
      });
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ message: 'Name and age are required' }));
    }
  });
};
