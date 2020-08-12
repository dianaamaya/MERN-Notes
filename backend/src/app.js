const express= require ('express');
const cors= require ('cors');
const app= express();

//routes const
const users = require('./routes/users');
const notes = require('./routes/notes');

//settings
app.set('port', process.env.PORT || 4000);

//midlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', users );
app.use('/api/notes', notes);


module.exports = app;