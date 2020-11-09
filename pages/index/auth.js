const app = getApp();
const User = require('../../service/user.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    userInfo: {
      avatarUrl: '/image/avatar.png'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    progress: 0,
    timer: ""
  },
  onReady() {
  },
  onLoad() {
    let index = 0;
    this.data.timer = setInterval(() => { //注意箭头函数！！
      index += 1;
      this.setData({
        progress: index
      })
      if (index == 100) {
        clearInterval(this.data.timer);
      }
    }, 10);
    this.getCode()
    wx.switchTab({
      url: 'index',
    })
  },
  getCode() {
    return new Promise((resolve, reject) => {
      console.log('getCode')
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code;
          resolve()
        },
        fail: () => {
          reject()
        }
      })
    })
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            this.setData({
              hasUserInfo: true
            })
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo
                app.globalData.iv = res.iv
                app.globalData.encryptedData = res.encryptedData
                console.log('getuserinfo')
                resolve()
              },
              fail: () => {
                reject()
              }
            })
          } else {
            reject()
          }
        },
        fall: () => {
          reject()
        }
      })
    })
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
      wx.setStorageSync('openid', data.openid)
      wx.setStorageSync('isBind', 'true')
      wx.switchTab({
        url: 'index',
      })
      this.loadding = false;
    }).catch((e) => {
      this.loadding = false;
      if (e && e.status_code == 4003) {
        app.globalData.openid = e.data.openid;
        wx.setStorage('openid', e.data.openid)
        wx.setStorage({
          key: 'isBind',
          data: ''
        })
        wx.redirectTo({
          url: '../login/login',
        })
        return;
      }
      showErrMsg(e.message || '登录失败');
    })
  }
})

