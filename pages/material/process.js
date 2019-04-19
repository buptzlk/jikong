// pages/material/process.js
const Material = require('../../service/material.js')
const { showErrMsg, formatTime } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    adminList: [],
    status: ['全部', '未审批', '审批通过', '已借用','拒绝'],
    statusIndex: 0,
    index: 0,
    page_size: 10,
    hasNextPage: 1,
  },

  bindStatusChange: function (e) {
    this.setData({
      statusIndex: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    let goods_id = e.target.dataset.id
    let admin_id = this.data.adminList[e.detail.value].id
    console.log(goods_id, admin_id);
  },
  getList: function () {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    Material.getBorrowList({
      index: this.data.index,
      page_size: this.data.page_size
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.goodsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取物资信息失败'
      })
    }).then(() => {
      this.loading = false;
    })
  },
  getAdminList: function(){
    Material.getAdminList().then((data) => {
      this.setData({
        adminList: data
      })
    }).catch((e) => {
      console.log(e)
      showErrMsg(e || '获取管理员列表失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getAdminList();
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
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})