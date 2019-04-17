// pages/message/list.js
const Notice = require('../../service/notice.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    page_size: 20,
    hasNextPage: 1,
    list: []
  },

  showModal: function(e) {
    let index = e.currentTarget.dataset.index
    let self = this;
    wx.showModal({
      content: this.data.list[index].content,
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          if (self.data.list[index].status == 1) {
            return;
          }
          let key = `list[${index}].status`;
          self.setData({
            [key] : 1,
          })
          Notice.readNotice({
            notice_id: self.data.list[index].id
          }).catch((e) => {
            console.log(e);
            wx.showToast({
              icon: 'none',
              title: '标记消息已读失败',
            })
          })
        }
      }
    });
  },

  getList: function() {
    if (this.data.hasNextPage !== 1 || this.loading) {
      return;
    }
    this.loading = true;
    Notice.getNoticeList({
      index: this.data.index,
      page_size: this.data.page_size
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.noticeInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取消息失败'
      })
    }).then(() => {
      this.loading = false;
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})