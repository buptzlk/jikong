const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com'

module.exports = {
  login: function({
    code,
    iv,
    encryptedData
  }) {
    return Http.post(domain + '/api/login', {
      code,
      iv,
      encryptedData
    });
  }
}