let express = require('express');
let app = express();
app.use(express.json());

let Datastore = require('nedb');
let db = new Datastore('coffee.db');
db.loadDatabase();

let coffeeTracker = [];

app.post('/noCups', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }
    db.insert(obj, (err, newDocs) => {
        if (err) {
            res.json({ task: "failed" });
        } else {
            res.json({ task: "success" });
        }
    })
    // coffeeTracker.push(obj);
    // console.log(coffeeTracker);
})


app.use('/', express.static('public'));

app.listen(3000, () => {
    console.log('listening at localhost:3000');
    let port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log('listening at ', port);
    });

})

app.get('/getCups', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.json({ task: "failed" });
        } else {
            let obj = { data: docs };
            res.json(obj);
        }

    })
})