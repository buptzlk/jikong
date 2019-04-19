const app = getApp();
const User = require('../../service/user.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    userInfo: {
      avatarUrl: '/image/avatar.png'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.iv = e.detail.iv;
      app.globalData.encryptedData = e.detail.encryptedData
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      User.login({
        code: app.globalData.code,
        iv: encodeURIComponent(app.globalData.iv),
        encryptedData: encodeURIComponent(app.globalData.encryptedData)
      }).then((data) => {
        app.globalData.openid = data.openid;
        wx.switchTab({
          url: 'index',
        })
      }).catch((e) => {
        if (e && e.status_code == 4003) {
          app.globalData.openid = e.data.openid;
          wx.redirectTo({
            url: '../login/login',
          })
          return;
        }
        console.log(e);
        showErrMsg('登录失败');
      })
    }
  }
})