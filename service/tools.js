const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const uploadFile = function({
  img
}) {
  return Http.post(domain + 'file/uploadImg', {
    open_id: app.globalData.openid,
    img
  })
}

const sendMsg = function({
  captcha
}) {
  return Http.post(domain + 'msg/send', {
    open_id: app.globalData.openid,
    captcha
  })
}

module.exports = {
  uploadFile,
  sendMsg
}