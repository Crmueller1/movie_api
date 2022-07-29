const express = require("express"), 
morgan = require('morgan');
const app = express();
//create a write stream (in append mode)
// a log.text file is created in root directory
//const accessLogStream =fs.createWriteStream(path.join(_dirname, 'log.text'), {flags:'a'});

//app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));
app.use(morgan('common'));

let topBooks= [
    {
        title: 'Name',
        author: 'Name'
    },
    {
        title: 'Name',
        author: 'Name'
    },
    {
        title: 'Name',
        author: 'Name'
    },
    {
        title: 'Name',
        author: 'Name'
    },
    {
        title: 'Name',
        author: 'Name'
    }
]


// GET REQUESTS
// req= Request from HTTP
// res= Response from HTTP
app.get('/',(req,res)=>{
    res.send('Welcome to my Movie API!');
});

app.get('/documentation',(req,res) =>{
    res.sendFile('public/documentation.html', {root: __dirname
    });
});

app.get('/books',(req, res) => {
    res.json(topBooks);
});

app.use((err, req, res, next)=> {
    console.log(err.stack);
    res.status(500).send ('Something went wrong!');
});

// LISTEN FOR REQUESTS
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});