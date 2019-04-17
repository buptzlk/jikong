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
  captcha,
  phone
}) {
  return Http.post(domain + 'msg/send', {
    open_id: app.globalData.openid,
    captcha,
    phone
  })
}

const getCaptcha = function() {
  return Http.post(domain + 'captcha', {
    open_id: app.globalData.openid
  })
}

module.exports = {
  uploadFile,
  sendMsg,
  getCaptcha
}