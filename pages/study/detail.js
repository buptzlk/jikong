// pages/study/detail.js
const app = getApp()
const Study = require('../../service/study.js')
const {showErrMsg} = require('../../utils/util.js')
var WxParse = require('../../component/wxParse/wxParse.js');

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
    let params = {
      id: +options.id
    }
    if (options.taskId) {
      params.task_id = +options.taskId
    }
    Study.getDetail(params).then(data => {
      this.setData({
        newsInfo: data
      })
      var that = this;
      let title = data.title.length <= 10 ? data.title : data.title.slice(0, 10) + '...'
      wx.setNavigationBarTitle({
        title: title,
      })
      let article = this.data.newsInfo.content || '';
      WxParse.wxParse('article', 'html', article, that, 0);

    }).catch((e) => {
      showErrMsg(e.message || '获取详情失败')
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
    if (this.options.taskId) {
      app.globalData.task_id = +this.options.taskId
    }
    if (this.options.taskType) {
      app.globalData.task_type = this.options.taskType
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