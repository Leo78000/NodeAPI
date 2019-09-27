const { join } = require('path');
const { tmpdir } = require('os');
const express = require('express');
const router = express.Router();
const { pushFile } = require('./liste');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const dest_dir = join(tmpdir(), 'monDossier');
const { connection } = require('./database')
var request = require('request');
var app = express();
const server = express();
const port = 3000;
server.set('view engine', 'ejs');
server.use(bodyParser.json());
server.use(cors());



router.get('/recherche', function(req, res){
    var query = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=6812ed41';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render('recherche', {data: data});
        }
    });
});


router.get('/movies', (req, res) => {
    connection.query(`SELECT title,date FROM nodeapi`, (err,res)=> {
        pushFile(res)
        .then(messages => res.status(201).json({message: messages}))
        .catch((err)=> res.status(201).json({ message : err}))
    })
    
});

router.post('/addmovie', (req, res) =>{
    var postMovie = req.body;
    connection.query(`INSERT INTO nodeapi SET ?`, postMovie, (error,results) => {
      if(error) throw error
      console.log(postMovie)
      res.end(JSON.stringify(results))
    });
});
router.put('/editmovie/:id', (req, res) =>{
    var newTitle = req.body.title;
    var newDate= req.body.date;
    var {id} = req.params;
    connection.query(`UPDATE nodeapi SET title ='${newTitle}', date='${newDate}' WHERE id =${id}`, (error,results) => {
      if(error) throw error
      console.log(newTitle)
      console.log(newDate)
      res.end(JSON.stringify(results))
    });
});
router.delete('/deletemovie/:id', (req, res) =>{
    var {id} = req.params;
    connection.query(`DELETE FROM  nodeapi WHERE id =${id}`, (error,results) => {
      if(error) throw error
      res.end(JSON.stringify(results))
    });
});

router.get('/films/:id', (req, res) =>{
    const { id } = req.params;
    connection.connect();
    connection.query(`SELECT * FROM nodeapi WHERE id = ${id}`, (err, res) => {
        if(err) throw err;
        console.log('The solution is: ', res[0])
    })
});

server.use(router)
server.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
    console.log('Le serveur fonctionne')
});