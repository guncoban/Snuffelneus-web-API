'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');
var corsHeaders = require('hapi-cors-headers')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '145.24.222.50',
    port: 8000
});

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '0945',
     database: 'snuffelneus'
});
// Add the route
server.route
({
    method: 'GET',
    path: '/api/measurements',
    handler: function (request, reply)
	{
       connection.query
	   ('SELECT * FROM measurements',
       function (error, results, fields)
	   {
       if (error) throw error;
       reply(results);
	   });
    }
});
server.start((err) => {
   if (err) {
     throw err;
   }
  console.log('Server running at:', server.info.uri);
});
server.ext('onPreResponse', corsHeaders)
