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
routes.delete('/notes/:id', (req, res) => {
    fs.readFile(`./db/db.json`, "utf-8", (err, data) => {
      console.log("we're in the delete");
      if (err) {
        console.log("Error on reading file");
        console.log(err);
        return;
      } else {
        const notes = JSON.parse(data);
        const userID = req.params.id;
        for(let i = 0; i < notes.length; i++) {
            if (userID === notes[i].id) {
                // check if id note is equal to chosen id
                console.log("userID === noteID");
                notes.splice(i,1);
            }
        }

        //then overwrite ds file to not include the note user selected
        const stringifyID = JSON.stringify(notes);
        fs.writeFile('./db/db.json', stringifyID, (err, data) => {
            if(err) {
                console.log("Error in writing file.");
                console.log(err);
            } else {
                res.json(stringifyID);
            }
        });
        }
    });
});

module.exports = routes;