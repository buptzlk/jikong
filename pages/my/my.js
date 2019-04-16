const app = getApp();
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '李一',
      avatarUrl: null,
      company: '疾控中心',
      score: 110,
      level: 1,
      rank: 200
    }
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
    this.setData({
      'userInfo.avatarUrl': app.globalData.userInfo.avatarUrl
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