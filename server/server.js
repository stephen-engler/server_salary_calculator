let express = require('express');// express
let bodyParser = require('body-parser');//body parse
let app = express();//app

const PORT = 8080;

//employee array
const EMPLOYEES = [];

app.use(bodyParser.urlencoded({extended: true})); //this is required

//when client sends info to server, server adds it to the array
app.post('/addEmp', (req,res)=>{
    console.log(req.body);
    EMPLOYEES.push(req.body.employee);
    res.send(EMPLOYEES);
});

//when client asks for employee sends back the Employee array
app.get('/employee', (req, res)=>{
    res.send(EMPLOYEES);
});





app.use(express.static('server/public'));//static server to html

//start the server
app.listen(PORT, () => {
    console.log('server is listening on port 8080');
});