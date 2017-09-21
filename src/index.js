const express = require( "express" );
const path = require( "path" );
const bodyParser = require( "body-parser" );
const app = express();
const router = express.Router();

const port = process.env.PORT || 9000;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

router.get( "/messages/:channel", ( req, res ) => {
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

// "/api/messages/C6BD48K4M" – is only available!

// app.use( "/api/", router);
app.use( "/", express.static( path.join( __dirname, '../static' ) ) );

app.listen( port, () => {
  console.log( `Server running on port ${ port }` );
} );
