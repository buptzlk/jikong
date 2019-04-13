const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com'

module.exports = {
  login: function(code) {
    return Http.post(domain + '/api/login', {code});
  }
}
