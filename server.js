'use strict'
const Hapi = require('hapi')                                    // The library used for the REST API server          
var corsHeaders = require('hapi-cors-headers')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection
({
    host: '145.24.222.50',
    port: 8000
});

var connection = require('./config.js').localConnect()          // MySQL connection data in external file for security
// Add the route
server.route
    ({
        method: 'GET',                                   // The method for the route, in this case a HTTP GET Request
        path: '/api/measurements',                       // The path for the request, 145.24.222.50/api/measurements
        handler: function (request, reply)
        {
            connection.query
                ('SELECT * FROM measurements',              // The query applied to the database, in this case get everything from the database
                function (error, results, fields)               // The callback function for the query
                {
                    if (error)
                    {
                        throw error
                    }
                    reply(results)                                  // Reply to the GET request with the query results
                });
        }
    });
server.start((err) =>   
{
    if (err) 
    {
        throw err
    }
    console.log('Server running at:', server.info.uri)
});
server.ext('onPreResponse', corsHeaders)
