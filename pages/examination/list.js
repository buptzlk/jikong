const Examination = require('../../service/examination.js')
const {showErrMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    this.easyModal = this.selectComponent("#easyModal");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
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
   * 获取试卷列表
   */
  getList: function () {
    Examination.getExaminationList().then((res) => {
     if (res) {
      this.setData({
        list: res
       });
     }
    }).catch((e) => {
      showErrMsg(e.message || '获取试卷列表失败')
    })
  },
  /**
   * 查看详情
   */
  viewDetail: function (e) {
    let dataId = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status
    let question = e.currentTarget.dataset.question
    if (status) {
      this.easyModal.show();
    } else {
      wx.navigateTo({
        url: '/pages/examination/detail?id=' + dataId + '&question=' + question,
      })
    }
  },
  confirm: function () {
    this.easyModal.hide();
  },
  exitTask: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})