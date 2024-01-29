const routes = require('express').Router();
const fs = require('fs');
//const db = require('../db/db.json');
const uuid = require('../helpers/uuid');

//get routes to notes
routes.get('/notes', (req, res) => {
    console.log("we're in the get");
    fs.readFile (`./db/db.json`, "utf-8", (err, data) => {
        if(err) {
            console.log("Error reading file");
            console.log(err);
            return;
        } else {
            res.json(JSON.parse(data));
            console.log("data");
            console.log(data);            
        }
    });
});

//post routes
routes.post('/notes', (req, res) => {
    const { title, text} = req.body;
    if(title && text) {
        const newNote = { 
            title, 
            text,
            id: uuid(),
        };

        fs.readFile(`./db/db.json`, "utf-8", (err, data) => {
            console.log("we're in the post");
          if (err) {
            console.log("Error on reading file");
            console.log(err);
            return;
          } else {
            const parseData = JSON.parse(data);
            console.log("parseData");
            console.log(parseData);
    
            parseData.push(newNote);
            const stringifyData = JSON.stringify(parseData);
    
            fs.writeFile('./db/db.json', stringifyData, (err, data) => {
                if(err) {
                    console.log("Error in writing file.");
                    console.log(err);
                } else {
                    res.json(stringifyData);
                }
            });
            }
        });
    } else {
        res.status(500).json('Error in posting review id to db');
    }
});

//delete route
routes.delete('/notes', (req, res) => {
    fs.readFile(`./db/db.json`, "utf-8", (err, data) => {
      console.log("we're in the delete");
      if (err) {
        console.log("Error on reading file");
        console.log(err);
        return;
      } else {
        //if user clicks on the trash can
        const noteID = JSON.parse()
        const userID = JSON.parse(data).id;
        const stringifyID = JSON.stringify(userID);
        if (userID === noteID){
        //then delete note based on id
        console.log("userID === noteID");
        } else {
            console.log("The ID variables do not equal each other.");
            res.status(500).json('Error in ID variables not equal to each other.');
        }

        //then overwrite ds file to not include the note user selected
        fs.writeFile('./db/db.json', stringifyID, (err, data) => {
            if(err) {
                console.log("Error in writing file.");
                console.log(err);
            } else {
                res.json(stringifyData);
            }
        });
        }
    });
});

module.exports = routes;