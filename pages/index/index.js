//index.js
//获取应用实例
const app = getApp()
const User = require('../../service/user.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindLoginTap: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function() {
    console.log(wx.getStorageSync('openid'));
    wx.login({
      success(res) {
        if (res.code) {
          // User.login(res.code).then((data) => {
          //   console.log(data);
          // }).catch((e) => {
          //   console.log(e)
          // })
          // 发起网络请求
          console.log(res.code);
          wx.getUserInfo({//getUserInfo流程
            success: function (res2) {//获取userinfo成功
              console.log(res2);
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var iv = res2.iv;
              //请求自己的服务器
              wx.request({
                url: 'https://www.knowalker.com/api/login',
                method: 'POST',
                data: {
                  code: res.code,
                  encryptedData,
                  iv
                },
                success(res) {
                  console.log(res);
                  wx.setStorage({
                    key: 'openid',
                    data: res.openid
                  })
                }
              })              
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})