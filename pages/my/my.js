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
    taskCount: 0,
    complete: '',
    open_id: wx.getStorageSync('openid'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  naviAvatar: function() {
    let userInfo = app.globalData.userInfo
    let avatarUrl = userInfo.cover_img_url || userInfo.avatarUrl
    wx.navigateTo({
      url: `./avatar?avatarUrl=${avatarUrl}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getUserInfo: function() {
    let that = this
    wx.request({
      url: 'https://www.btcuee.com/api/page/my',
      data: {
        open_id: app.globalData.openid,
      },
      method: "post",
      success: function (res) {
        app.globalData.userInfo = res.data.data.userInfo
        that.setData({
          userInfo: res.data.data.userInfo,
          noticeCount: res.data.data.noticeCount,
          taskCount: res.data.data.taskCount,
          complete: res.data.data.complete
        })
        // that.onShow()
        console.log(res.data.data)
      }
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
    // this.getUserInfo();
    this.setData({
      open_id: app.globalData.openid,
    })
    this.getUserInfo()
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

  },

  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: res => {
          if(res.code) {
            User.getPhoneNo({
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData
            }).then((res) => {
              wx.setStorageSync('openid', res.openid)
              that.setData({
                open_id: res.openid
              })
              app.globalData.openid = res.openid
              that.getUserInfo();
            })
          }
        }
      })
    }
  },
  getCode() {
    return new Promise((resolve, reject) => {
      console.log('getCode')
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code;
          resolve()
        },
        fail: () => {
          reject()
        }
      })
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.iv = res.iv
                app.globalData.encryptedData = res.encryptedData
                console.log(app.globalData.code)
                console.log(app.globalData.iv)
                console.log(app.globalData.encryptedData)
                resolve()
              },
              fail: () => {
                reject()
              }
            })
            } else {
            reject()
            }
         },
        fall: () => {
          reject()
        }
      })
    })
  },
  login() {
    if (!app.globalData.code || !app.globalData.iv || !app.globalData.encryptedData) {
      return;
    }
    console.log(app.globalData.code)
    User.login({
      code: app.globalData.code,
      iv: encodeURIComponent(app.globalData.iv),
      encryptedData: encodeURIComponent(app.globalData.encryptedData)
    }).then((data) => {
      console.log(data)
      app.globalData.openid = data.openid
      this.setData({
        open_id: app.globalData.openid,
      })
      wx.setStorageSync('openid', data.openid)
      wx.setStorageSync('isBind', 'true')
    }).catch((e) => {
      this.loadding = false;
      if (e && e.status_code == 4003) {
        app.globalData.openid = e.data.openid;
        wx.setStorage('openid', e.data.openid)
      }
      showErrMsg(e.message || '登录失败');
    })
  },
  bindGetUserInfo(e) {
    let that = this
    wx.login({
      success: res => {
        if(res.code) {
          console.log(res.code)
          app.globalData.code = res.code
          app.globalData.iv = e.detail.iv
          app.globalData.encryptedData = e.detail.encryptedData
          User.myLogin({
            code: res.code,
            iv: encodeURIComponent(e.detail.iv),
            encryptedData: encodeURIComponent(e.detail.encryptedData)
          }).then((res) => {
            console.log(res)
            wx.setStorageSync('openid', res.openid)
            app.globalData.openid = res.openid
            app.globalData.userInfo = res.userInfo
            that.setData({
              open_id: res.openid,
              userInfo: app.globalData.userInfo,
              noticeCount: res.noticeCount,
              taskCount: res.taskCount,
              complete: res.complete
            })
            that.getUserInfo()
          }).catch((e) => {})
        }
      }
    })
  }
})