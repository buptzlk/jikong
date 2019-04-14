const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    let self = this;
    if (app.globalData.userInfo) {
      wx.switchTab({
        url: 'index',
      })
      return;
    }
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              app.globalData.userInfo = res.userInfo
              app.globalData.iv = res.iv
              app.globalData.encryptedData = res.encryptedData;
              self.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              });
              wx.switchTab({
                url: 'index',
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.iv = e.detail.iv;
    app.globalData.encryptedData = e.detail.encryptedData 
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }) 
    wx.switchTab({
      url: 'index',
    })           
  }
})