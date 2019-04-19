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
    this.getHomeData();  
    this.getUserData(); 
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
      this.setData({
        userInfo: app.globalData.userInfo
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