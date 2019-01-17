const express = require('express');
const formidable = require('formidable');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    const form  = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/data/' + file.name;
    });
    form.on('file', (name, file) => {
        console.log('Uploaded ' + file.name);
    });
    return res.status(200).json({ result: 'Uploaded success' });
});

app.listen(3000, () => console.log('Server app listening on port 3000!'));