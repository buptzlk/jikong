
const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/question/'
const app = getApp();

const get = function() {
  return Http.post(domain + 'get', {
    open_id: app.globalData.openid,
  })
}

const submit = function ({
  question_id,
  answer
}) {
  return Http.post(domain + 'post', {
    open_id: app.globalData.openid,
    question_id,
    answer
  })
}

module.exports = {
  get,
  submit
}
