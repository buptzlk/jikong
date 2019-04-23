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
      name: 'img',
      formData: {
        open_id: app.globalData.openid
      },
      success(res) {
        res = JSON.parse(res.data)
        if (res.status_code == 0) {
          resolve(res.data)
        } else {
          reject(new Error(res.message || '上传失败'))
        }
        
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