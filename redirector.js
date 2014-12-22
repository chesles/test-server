var get_value = require('./get-value')

module.exports = function(request, reply) {
  var location = get_value(request, 'location', null)
    , code = Number(get_value(request, 'responsecode', 302))

  if (location) {
    reply().takeover().redirect(location).code(code)
  }
  else {
    reply(null)
  }

}
