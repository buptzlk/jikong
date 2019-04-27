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
  onReady() {
  },
  onLoad() {
    if (app.globalData.openid && app.globalData.isBind) {
      wx.switchTab({
        url: 'index',
      })
    } else if (app.globalData.openid) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.login();
    }  
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
      this.login()
    }
  },
  login() {
    console.log(app.globalData);
    if (!app.globalData.code || !app.globalData.iv || !app.globalData.encryptedData || app.globalData.openid || this.loadding) {
      return;
    }
    console.log('try login');
    this.loadding = true
    User.login({
      code: app.globalData.code,
      iv: encodeURIComponent(app.globalData.iv),
      encryptedData: encodeURIComponent(app.globalData.encryptedData)
    }).then((data) => {
      app.globalData.openid = data.openid;
      app.globalData.isBind = true;
      wx.switchTab({
        url: 'index',
      })
      this.loadding = false;
    }).catch((e) => {
      this.loadding = false;
      if (e && e.status_code == 4003) {
        app.globalData.openid = e.data.openid;
        app.globalData.isBind = false;
        wx.redirectTo({
          url: '../login/login',
        })
        return;
      }

      showErrMsg(e.message || '登录失败');
    })
  }
})

