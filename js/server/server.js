const express = require( 'express' );
const cors = require( 'cors' );
const app = express();


app.use( cors() ); 
app.use( express.json() );
app.use(express.urlencoded( { extended: true } ) );

require( '../index' )( app );

app.listen(3000, () => {
    console.log("Porta 3000 ativa");
});