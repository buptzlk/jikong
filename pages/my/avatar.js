// pages/my/avater.js
const app = getApp()
const User = require('../../service/user.js')
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
    console.log(this.options.avatarUrl, this.options.set);
    if (this.options.set) {
      let newAvatarUrl = this.options.avatarUrl
      User.updateUser({
        cover_img_url: newAvatarUrl
      }).then(() => {
        app.globalData.userInfo.cover_img_url = newAvatarUrl;
      }).catch((e) => {
        console.log(e)
        showErrMsg(e || '更新头像失败')
      })
      // wx.uploadFile({
      //   url: 'https://www.knowalker.com/api/file/uploadImg',
      //   filePath: this.options.avatarUrl,
      //   name: 'img',
      //   name: 'file',
      //   formData: {
      //     open_id: app.globalData.openid
      //   },
      //   success(res) {
      //     const data = res.data
      //     console.log(data);
      //   }
      // })    
    }
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