// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
const port = 8000
let projectData = {}

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
app.listen(port, () => {
  console.log("server running"); 
   console.log(`running on localhost: ${port}`);
})
// Initialize all route with a callback function
app.get('/', (req, res) => {
  res.send('Hello World express')
})
// Callback function to complete GET '/all'

const data = [];
// const fakeAnimal = {animal : 'LIon', fact : 'Lion is cool'};
app.get('/all', (req, res) => {
  res.send(data)
})

// Post Route
app.post('/weather', sendData);
function sendData (req, res) {
  projectData={
    temperature:req.body.temperature,
    date:req.body.date,
    feelings:req.body.feelings
  }
  console.log("data",data)
  data.push(projectData);
  res.send({result:'saved'})
};






