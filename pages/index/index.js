//index.js
//获取应用实例
const app = getApp()
const User = require('../../service/user.js');
const Home = require('../../service/index.js')

Page({
  data: {
    userInfo: null,
    newsInfo: [],
    slideInfo: null,
    noticeCount: 0
  },
  onLoad: function() {    
    if (app.globalData.openid) {
      console.log(openid);
      return;
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    User.login({
      code: app.globalData.code,
      iv: encodeURIComponent(app.globalData.iv),
      encryptedData: encodeURIComponent(app.globalData.encryptedData)
    }).then((data) => {
      app.globalData.openid = data.openid;
      this.getHomeData();
      this.getUserData();
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '登录失败',
      })
    })
    
  },
  getHomeData: function() {
    Home.getHomeInfo().then((data) => {
      this.setData({
        newsInfo: data.newsInfo,
        slideInfo: data.slideInfo,
        noticeCount: data.noticeCount
      })
      app.globalData.noticeCount = data.noticeCount
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取首页信息失败',
      })
    })
  },
  getUserData: function() {
    if (app.globalData.userInfo.name) {
      return;
    }
    User.getUserInfo().then((data) => {
      app.globalData.userInfo = Object.assign(app.globalData.userInfo, data.userInfo);
      this.setData({
        userInfo: data.userInfo
      })
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取用户信息失败',
      })
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
  }
})