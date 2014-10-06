var get_value = require('./get-value')

module.exports = function() {
  var seen_values = {}
  var key_counts = {}

  return function(request, reply) {
    var enforce = get_value(request, 'enforce_unique', false)
    var err

    if (!enforce) return reply()

    var keys = get_value(request, 'unique_keys', 'unique').split(',')

    keys.forEach(function(key) {
      var value = get_value(request, key, null)

      if (!seen_values[key])
        seen_values[key] = []

      if (seen_values[key].indexOf(value) >= 0)
        err = err || new Error('Duplicate value for key "'+key+'", "'+value+'"')
      else
        seen_values[key].push(value)
    })

    if (err) {
      console.log(err)
      reply(err)
    }
    else {
      reply('OK')
    }
  }
}
