//index.js
//获取应用实例
const app = getApp()
const User = require('../../service/user.js');
const Home = require('../../service/index.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    userInfo: null,
    newsInfo: [],
    slideInfo: null,
    noticeCount: 0
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
      showErrMsg(e.message || '获取首页信息失败')
    })
  },
  getUserData: function() {
    User.getUserInfo().then((data) => {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取用户信息失败')
    })
  },
  naviAnswer: function() {
    wx.navigateTo({
      url: '/pages/answer/answer',
    })
  },
  naviWrong: function() {
    wx.navigateTo({
      url: '/pages/answer/wrong',
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
  onLoad: function () {
  },
  onShow: function() {
    this.getHomeData();
    this.getUserData();
  }
})