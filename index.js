const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.all("SELECT * FROM commands", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error retrieving commands from database.");
        } else {
            res.render('index', { buttons: rows });
        }
    });
});

app.post('/add-button', (req, res) => {
    const { label, command } = req.body;
    const stmt = db.prepare("INSERT INTO commands (label, command) VALUES (?, ?)");
    stmt.run(label, command, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error adding command to database.");
        } else {
            res.redirect('/');
        }
    });
    stmt.finalize();
});

app.post('/execute', (req, res) => {
    const { command } = req.body;
    exec(`powershell.exe -Command "${command}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return res.json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.json({ stderr });
        }
        try {
            const jsonData = JSON.parse(stdout);
            res.json({ json: jsonData });
        } catch (e) {
            res.json({ output: stdout });
        }
    });
});

app.post('/edit-button', (req, res) => {
    const { id, label, command } = req.body;
    const stmt = db.prepare("UPDATE commands SET label = ?, command = ? WHERE id = ?");
    stmt.run(label, command, id, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error updating command in database.");
        } else {
            res.redirect('/');
        }
    });
    stmt.finalize();
});

app.post('/delete-button', (req, res) => {
    const { id } = req.body;
    const stmt = db.prepare("DELETE FROM commands WHERE id = ?");
    stmt.run(id, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error deleting command from database.");
        } else {
            res.redirect('/');
        }
    });
    stmt.finalize();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
