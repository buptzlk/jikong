const Http = require('../utils/http.js')
const domain = 'https://www.btcuee.com/api/task/'
const app = getApp();

const getTaskList = function () {
  return Http.post(domain + 'list', {
    open_id: app.globalData.openid
  })
}

const sign = function({
  task_id,
  user_answer
}) {
  return Http.post(domain + 'sign', {
    open_id: app.globalData.openid,
    task_id,
    user_answer
  })
}

const get = function({
  task_id,
  index
}) {
  return Http.post(domain + 'get', {
    open_id: app.globalData.openid,
    task_id,
    index
  })
}

module.exports = {
  getTaskList,
  sign,
  get
}