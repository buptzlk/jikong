//index.js
//获取应用实例
const app = getApp()
const User = require('../../service/user.js');

Page({
  data: {
    userInfo: null,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindLoginTap: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function() {    
    if (app.globalData.openid) {
      console.log(openid);
      return;
    }
    User.login({
      code: app.globalData.code,
      iv: encodeURIComponent(app.globalData.iv),
      encryptedData: encodeURIComponent(app.globalData.encryptedData)
    }).then((data) => {
      app.globalData.openid = data.openid;
    }).catch((e) => {
      console.log('登录失败')
    })
  },
  naviAnswer: function() {
    wx.navigateTo({
      url: '/pages/answer/answer?type=0',
    })
  },
  naviWrong: function() {
    wx.navigateTo({
      url: '/pages/answer/answer?type=1',
    })
  },
  naviMaterial: function() {
    wx.switchTab({
      url: '/pages/material/material',
    })
  },
  naviTask: function() {
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  naviStudy: function() {
    wx.switchTab({
      url: '/pages/study/list',
    })
  },
  naviMessage: function() {
    wx.navigateTo({
      url: '/pages/message/list',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})