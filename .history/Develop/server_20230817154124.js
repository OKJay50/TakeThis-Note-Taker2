const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from the uuid package

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Generate a unique ID for the new note using uuidv4
  newNote.id = uuidv4();

  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  notes.push(newNote);

  fs.writeFileSync('db.json', JSON.stringify(notes));

  res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
