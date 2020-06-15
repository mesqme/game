const express = require('express');
const Datascore = require('nedb');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const db = new Datascore({filename: './data/db', autoload: true});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/info', (req, res) => {
    db.find({}, (err, docs) => {
        res.send(JSON.stringify(docs));
    });
});

app.get('/top', (req, res) => {
    db.find({}).sort({score: -1}).limit(3).exec((err, docs) => {
        res.send(JSON.stringify(docs));
    });
});

app.post('/save', (req, res) => {
    let username = req.body.name;
    let score = parseInt(req.body.score);

    db.insert({username: username, score: score}, (err, newDoc) => {
        console.log("New player added");
        res.send({"status": "saved"});
    });
});

app.listen(port, () => {
    console.log("server is listening on port 3000");
});