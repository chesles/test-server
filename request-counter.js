module.exports = function() {
  var stats = {
    requests:  0,
    responses: 0,
  }
  function counter(request, reply) {
    stats.requests++
    reply(stats)
  }
  counter.count_response = function() {
    stats.responses++
  }

  return counter
}
