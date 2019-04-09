// pages/my/info-edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      company: '单位1',
      department: '科室一',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/15847491?s=460&v=4'
    },
    politicals: ["党员", "团员", "群众"],
    politicalIndex: 0,
    companys: ["单位1", "单位2"],
    companyIndex: 0,
  },
  bindPoliticalChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      politicalIndex: e.detail.value
    })
  },

  bindCompanyChange: function (e) {
    this.setData({
      companyIndex: e.detail.value
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