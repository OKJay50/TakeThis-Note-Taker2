const path = require('path');

module.exports = (app) => {
    // Route to serve the notes page
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // Default route to serve the index page
    app.get('*', (req, res) => { // <-- This should be last
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
