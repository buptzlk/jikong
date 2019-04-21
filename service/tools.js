const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const uploadFile = function({
  img
}) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: domain + 'file/uploadImg',
      filePath: img,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'img',
      formData: {
        open_id: app.globalData.openid
      },
      success(res) {
        resolve(res.data)
      },
      fail() {
        reject('上传头像失败')
      }
    }) 
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