const routes = require('express').Router();
const fs = require('fs');

//get routes to notes
routes.get('/notes', (req, res) => {
    console.log("we're in the get");
    fs.readFile ('./db/db.json', "utf-8", (data) => {
        res.json(JSON.parse(data));
        console.log("hello");
        console.log(data);
    });
});

//post routes
routes.post('/notes', (req, res) => {
    fs.readFile('../db/db.json', "utf-8", (data) => {
        const parseData = JSON.parse(data);
        console.log(parseData);
        parseData.push(req.body);
        fs.writeFile('../db/db.json', parseData, "utf-8", (data) => {
            res.json(data);
        });
    });
});

//delete route
// routes.delete('/notes', (req, res) => {
//     fs.readFile('../db/db.json', "utf-8", (data) => {
//         const parseData = JSON.parse(data);
//         console.log(parseData);
//         parseData.push(req.body);
//         fs.writeFile('../db/db.json', parseData, "utf-8", (data) => {
//             res.json(data);
//         });
//     });
// });

module.exports = routes;