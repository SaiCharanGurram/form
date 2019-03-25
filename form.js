const express = require('express')
const bodyParser = require('body-Parser')
var mysql = require('mysql')
const app = express()
const port = 3000
app.use(express.static('../library'))

app.use (bodyParser.urlencoded({extended: false}))

 app.set('view engine','pug')

app.get('/',function (req, res) { 
    res.sendFile('index.html',{root:__dirname})
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'gakuen'
  });
  
  connection.connect( function(err){
    if (err) throw err

     console.log('connected..');
  })

  app.post('/submit', function (req,res) {
     // console.log(req.body);
     const name = req.body.name
     const email = req.body.email
     const mobile = req.body.mobile

     const queryString = "INSERT INTO users ( name, email, mobile) VALUES (?, ?, ?)";
    
     connection.query(queryString,[name, email, mobile] , (err,results) =>{

     
         if (err) throw err
     

        res.render('index',{title: 'Data Saved',
        message: 'Data Saved Successfully.'})
        })

       
   
    });
    //connection.end();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))