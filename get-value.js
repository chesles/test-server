module.exports = function get_value(request, key, _default) {
  return request.payload && request.payload[key]
      || request.query   && request.query[key]
      || _default
}
