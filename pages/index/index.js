//index.js
//获取应用实例
const app = getApp()
const User = require('../../service/user.js');
const Home = require('../../service/index.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    userInfo: null,
    catInfo: [],
    slideInfo: null,
    noticeCount: 0
  },
  getHomeData: function() {
    Home.getHomeInfo().then((data) => {
      this.setData({
        catInfo: data.catInfo,
        slideInfo: data.slideInfo,
        noticeCount: data.noticeCount,
        taskCount: data.taskCount
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
  naviDetail: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  naviStudyWithCat: function(e) {
    wx.navigateTo({
      url: `/pages/study/newList?cat_id=${e.currentTarget.dataset.id}`,
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