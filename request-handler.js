var request_counter = require('./request-counter')
  , unique_enforcer = require('./unique-enforcer')
  , get_value = require('./get-value')

var counter = request_counter()
  , check_unique = unique_enforcer()

module.exports = {
  path: '/{handler*}',
  method: '*',
  handler: handler,
  config: {
    pre: [
      { method: check_unique },
      [
        { method: delay_response, assign: 'delay' },
        { method: counter,        assign: 'stats' },
      ],
    ]
  }
}

function handler(request, reply) {
  console.log("\n => %s %s", request.method.toUpperCase(), request.path)
  console.log("Headers:", request.headers)

  if (request.params)
    console.log("Params:", request.params)

  if (request.query)
    console.log("QueryString:", request.query)

  if (request.payload)
    console.log("Payload:", request.payload)

  console.log("Delay:", request.pre.delay)
  console.log("Server load:", request.server.load)

  reply(request.headers)
  counter.count_response()
  console.log("Stats:", request.pre.stats)
}

function delay_response(request, reply) {
  var delay = get_value(request, 'delay', 0)

  if (delay)
    setTimeout(function() { reply(delay); }, delay)
  else
    reply(delay)
}
