const express = require("express"), 
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');
const app = express();
//create a write stream (in append mode)
// a log.text file is created in root directory
//const accessLogStream =fs.createWriteStream(path.join(_dirname, 'log.text'), {flags:'a'});

//app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));



// let users = require('./users.json');   HOLDING CODE FOR LATER USE IN PROJECT

// const movies = require('./movies.json');  HOLDING CODE FOR LATER USE IN PROJECT

let users= [
    {
        id:1,
        name: 'Anton',
        favoriteMovies: ["Aladdin"]
    },
    {
        id:2,
        name: 'Izabelle',
        favoriteMovies: ["Frozen"]
    },
    {
        id:3,
        name: 'Elizabeth',
        favoriteMovies: ["The Jungle Book"]
    },
    {
        id:4,
        name: 'Cristian',
        favoriteMovies: []
    },
]

let movies= [

    {
        Title:'Aladdin',
        'Description':"A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",

        Directors: {
            "Name": "Ron Clements",
            "Bio": "Ron Clements was born on April 25, 1953 in Sioux City, Iowa, USA. He is a writer and director, known for Hercules (1997), Aladdin (1992) and The Princess and the Frog (2009). He has been married to Tamara Lee Glumace since February 25, 1989."
        },

        Genre: {"Name":'Action',
        'Description':"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero",
        
    }
    },

    {
        Title: 'Beauty and the Beast',
        'Description':"Place Holder",
        Directors: {
            'Name': "Place holder",
            'Bio': "Place holder"
        },

        Genre: {'Name':'Placer holder',
        'Description':'Place holder'}
    },
    {
        Title: 'Lelo and Stitch',
        'Description':"Place Holder",
        Directors: {
            'Name': "Place holder",
            'Bio': "Place holder"
        },

        Genre: {'Name':'Placer holder',
        'Description':'Place holder'}
    },
    {
        Title: 'Frozen',
        'Description':"Place Holder",
        Directors: {
            'Name': "Place holder",
            'Bio': "Place holder"
        },

        Genre: {'Name':'Placer holder',
        'Description':'Place holder'}
    },
    {
        Title: 'The Jungle Book',
        'Description':"Place Holder",
        Directors: {
            'Name': "Place holder",
            'Bio': "Place holder"
        },

        Genre: {'Name':'Placer holder',
        'Description':'Place holder'}
    }

];


// GET REQUESTS
// req= Request from HTTP
// res= Response from HTTP

app.post('/users',(req,res)=> {
    const newUser= req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names!')
    }
})

app.put('/users/:id',(req,res)=> {
    const {id} = req.params;
    const updatedUser= req.body;

    let user = users.find(user => user.id == id);
    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No such user!')
    }
})

app.post('/users/:id/:movieTitle',(req,res)=> {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to ${user.name}'s array`);;
    } else {
        res.status(400).send('No such user!')
    }
})


app.delete('/users/:id/:movieTitle',(req,res)=> {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favoriteMovies= user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from ${user.name}'s array`);;
    } else {
        res.status(400).send('No such user!')
    }
})

app.delete('/users/:id',(req,res)=> {
    const {id} = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        users= users.filter( user => user.id != id);
        res.status(200).send(`user ${user.name} has been deleted`);;
    } else {
        res.status(400).send('No such user!')
    }
})







app.get('/',(req,res)=>{
    res.send('Welcome to my Movie API!');
});

app.get('/documentation',(req,res) =>{
    res.sendFile('public/documentation.html', {root: __dirname
    });
});

app.get('/movies',(req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title',(req, res) => {
    //const title = req.params.title; old way
    const {title} = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
    res.status(200).json(movie);
}   else {
    res.status(400).send('No such movie!')
} 
});

app.get('/movies/genre/:genreName',(req, res) => {
    //const title = req.params.title; old way
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
    res.status(200).json(genre);
}   else {
    res.status(400).send('No such genre!')
} 
});


app.get('/movies/directors/:directorName',(req, res) => {
    //const title = req.params.title; old way
    const {directorName} = req.params;
    const director = movies.find( movie => movie.Directors.Name === directorName).Directors;

    if (director) {
    res.status(200).json(director);
}   else {
    res.status(400).send('No such director!')
} 
});





app.use((err, req, res, next)=> {
    console.log(err.stack);
    res.status(500).send ('Something went wrong!');
});

// LISTEN FOR REQUESTS
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});