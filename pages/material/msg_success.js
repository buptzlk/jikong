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
  }
});