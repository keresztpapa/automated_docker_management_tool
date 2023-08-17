const express = require('express');
const path = require('path'); // Beimportáljuk a 'path' modult

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '/frontend/html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});