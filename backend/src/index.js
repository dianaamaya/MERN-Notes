require('dotenv').config()

//get the server configuration
const app = require ('./app');

//get database configuration
require('./database');

//get port
const port = app.get('port');

// set server to listen
async function main(){
    await app.listen(port);
    console.log(`server on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
}
// starting server
main();