// pages/my/avater.js
const app = getApp()
const User = require('../../service/user.js')
const Tool = require('../../service/tools.js')
const {showErrMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avaterUrl: ''
  },

  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `./upload/upload?src=${src}`
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'avatarUrl': this.options.avatarUrl
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
    let self = this;
    if (this.options.set) {
      let newAvatarUrl = this.options.avatarUrl
      Tool.uploadFile({img: newAvatarUrl}).then((data) => {
        self.updateAvatarUrl(data.url)
      }).catch(e => {
        showErrMsg(e || '上传头像失败')
      })   
    }
  },

  updateAvatarUrl: function(url) {
    User.updateUser({
      cover_img_url: url
    }).then(() => {
      app.globalData.userInfo.cover_img_url = url;
    }).catch((e) => {
      showErrMsg(e || '更新头像失败')
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})