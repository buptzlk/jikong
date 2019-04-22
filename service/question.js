
const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const get = function() {
  return Http.post(domain + 'question/get', {
    open_id: app.globalData.openid,
  })
}

const submit = function ({
  question_id,
  answer
}) {
  return Http.post(domain + 'question/post', {
    open_id: app.globalData.openid,
    question_id,
    answer
  })
}

const learned = function({
  question_id
}) {
  return Http.post(domain + 'wrong/learned', {
    open_id: app.globalData.openid,
    question_id,
  })
}

const getWrongList = function({
  index,
  page_size
}) {
  return Http.post(domain + 'wrong/get', {
    open_id: app.globalData.openid,
    index,
    page_size
  })
}

module.exports = {
  get,
  submit,
  learned,
  getWrongList
}
