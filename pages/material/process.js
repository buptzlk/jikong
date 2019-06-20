// pages/material/process.js
const Material = require('../../service/material.js')
const {
  showErrMsg,
  showSuccMsg,
  formatTime
} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    adminList: [],
    status: [{
      status: -1,
      val: '全部'
    }],
    statusIndex: 0,
    status_id: -1,
    index: 1,
    page_size: 10,
    hasNextPage: 1,
  },

  bindStatusChange: function(e) {
    if (this.data.statusIndex == e.detail.value) {
      return;
    }
    this.setData({
      statusIndex: e.detail.value,
      status_id: this.data.status[e.detail.value].status,
      index: 1,
      list: [],
      hasNextPage: 1
    })
    this.getList()
  },
  bindPickerChange: function(e) {
    let borrow_id = e.target.dataset.id
    let admin_id = this.data.adminList[e.detail.value].id
    Material.remind({
      borrow_id,
      admin_id
    }).then((data) => {
      showSuccMsg('已提醒')
    }).catch((e) => {
      showErrMsg(e.message || '催办失败')
    })
  },
  getList: function() {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: '',
    })
    Material.getBorrowList({
      index: this.data.index,
      page_size: this.data.page_size,
      status: this.data.status_id
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.goodsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
      if (this.data.status.length == 1) {
        this.setData({
          status: this.data.status.concat(data.statusOptions)
        })
      }
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取物资信息失败'
      })
    }).then(() => {
      this.loading = false;
      this.setData({
        loading: false
      })
      wx.hideLoading()
    })
  },
  getAdminList: function() {
    Material.getAdminList().then((data) => {
      this.setData({
        adminList: data
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取管理员列表失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
    this.getAdminList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})