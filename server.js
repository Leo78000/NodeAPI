const express = require('express');
const router = express.Router();
const { pushFile } = require('./liste');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { connection } = require('./database')

const server = express();
const port = 3000;
server.use(bodyParser.json());
server.use(cors());



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