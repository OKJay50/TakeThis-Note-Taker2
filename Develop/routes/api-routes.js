const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {

    // Route to get all notes
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // Route to save a new note
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        // Assign a unique ID to the new note
        newNote.id = uuidv4();

        try {
            // Read the current notes from the db.json file
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                if (err) throw err;
                const notes = JSON.parse(data);

                // Add the new note to the array of notes
                notes.push(newNote);

                // Write the updated notes back to the db.json file
                fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
                    if (err) throw err;
                    res.json(newNote);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        // Read the current notes from db.json
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);

            // Filter out the note with the given id
            notes = notes.filter(note => note.id !== noteId);

            // Write the updated notes back to db.json
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    });
}
