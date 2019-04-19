const app = getApp();
const User = require('../../service/user.js')
const {showErrMsg}  = require('../../utils/util.js')

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    noticeCount: 0,
    complete: ''
  },
  naviAvatar: function() {
    wx.navigateTo({
      url: `./avatar?avatarUrl=${app.globalData.userInfo.avatarUrl}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  getUserInfo: function() {
    User.getUserInfo().then(data => {
      this.setData({
        userInfo: app.globalData.userInfo,
        noticeCount: data.noticeCount,
        complete: data.complete
      })
    }).catch((e) => {
      console.log(e);
      showErrMsg(e || '获取用户信息失败')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})