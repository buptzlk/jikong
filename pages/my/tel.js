// pages/my/tel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldTel: null,
    newTel: null,
    vcode: null
  },

  setNewTel: function (e) {
    console.log(e.detail.value);
    this.setData({
      newTel: e.detail.value
    });
  },

  setOldTel: function (e) {
    console.log(e.detail.value);
    this.setData({
      oldTel: e.detail.value
    });
  },

  setVcode: function (e) {
    console.log(e.detail.value);
    this.setData({
      vcode: e.detail.value
    });
  },

  submitForm: function() {
    console.log(this.data);
  },

  sendVcode: function() {
    console.log('send vcode');
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