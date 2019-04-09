// pages/material/process.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: '防辐射服',
        num: 2,
        time: '2019-04-01 12:12:12',
        statusText: '未审批'
      },
      {
        name: '防辐射服',
        num: 2,
        time: '2019-04-01 12:12:12',
        statusText: '未审批'
      },
    ],
    status: ['全部', '未审批', '审批通过', '已借用','拒绝'],
    statusIndex: 0
  },

  bindStatusChange: function (e) {
    this.setData({
      statusIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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