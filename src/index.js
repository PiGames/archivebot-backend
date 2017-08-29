const express = require( "express" );
const bodyParser = require( "body-parser" );
const app = express();

const port = process.env.PORT || 9000;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.get( "/messages/:channel", ( req, res ) => {
  const users = require( "./users.json" );
  const usersList = {};
  users.members.forEach( ( user ) => {
    usersList[ user.id ] = user.name;
  } );


  const messages = require( "./messages.json" );

  messages.messages = messages.messages.map( ( msg ) => {
    return Object.assign( msg, { user: usersList[ msg.user ] } );
  } );

  res.json( messages );
} );

console.log( process.env.MONGODB_URI );

app.listen( port, () => {
  console.log( `Server running on port ${ port }` );
} );
