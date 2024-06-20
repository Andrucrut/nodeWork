const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )
  `);
});

const getUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    callback(err, rows);
  });
};

const addUser = (user, callback) => {
  const { name, age } = user;
  db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], function(err) {
    callback(err, { id: this.lastID, ...user });
  });
};

const updateUser = (id, updateData, callback) => {
  const { name, age } = updateData;
  db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [name, age, id], function(err) {
    callback(err, this.changes);
  });
};

const deleteUser = (id, callback) => {
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    callback(err, this.changes);
  });
};

const getUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  db,
};
