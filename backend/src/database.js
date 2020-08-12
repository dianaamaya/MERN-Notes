const mongoose= require ('mongoose');

//get variables
const URI = process.env.MONGODB_URI ;

// connection config
mongoose.connect(URI, {

    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false

});

// connect to database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});

