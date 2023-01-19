const bodyParser = require("body-parser");
const app = require("express")();
const port = 3000;

const db = require("./database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create", (req, res) => {
    const endpoint = req.body.endpoint;
    const url = req.body.url;

    if(db.checkIfDup(endpoint)) return res.send();

    db.pushToDatabase(endpoint, url);
    res.json();
    res.status(200);
});

app.get("/", (req, res) => {
    res.json(db.readAll());
    res.status(200);
});

app.get("/:endpoint", (req, res) => {
    const endpoint = req.params.endpoint;

    const url = db.getUrlByEndpoint(endpoint);

    res.redirect(url);
});

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`port ${port}`);
});