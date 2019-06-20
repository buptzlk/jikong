let app = getApp()

Page({
  naviProcess: function () {
    wx.redirectTo({
      url: 'process',
    })
  },
  naviHome: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad() {
    app.globalData.hasBorrowed = true
  }
});