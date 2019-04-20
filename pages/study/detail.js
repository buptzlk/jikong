// pages/study/detail.js
const Study = require('../../service/study.js')
const {showErrMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    Study.getDetail({
      id: options.id
    }).then(data => {
      this.setData({
        newsInfo: data
      })
    }).catch((e) => {
      console.log(e)
      showErrMsg(e || '获取详情失败')
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