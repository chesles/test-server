var hapi    = require('hapi')
  , handler = require('./request-handler')

var host = 'localhost'
  , port = 2700
  , options = { load: { sampleInterval: 200 }}

var server = new hapi.Server()

server.connection({ port: port })
server.route(handler)

server.start(function() {
  console.log("Server started at:", server.info.uri)
})
