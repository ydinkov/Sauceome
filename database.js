const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('commands.db'); // Change to a file-based database

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        command TEXT NOT NULL
    )`);
});

module.exports = db;
