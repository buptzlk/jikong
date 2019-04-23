// pages/message/list.js
const Notice = require('../../service/notice.js')
const {showErrMsg} = require('../../utils/util.js')

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
            showErrMsg(e.message || '标记消息已读失败')
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
      showErrMsg(e.message || '获取消息失败')
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
  }
})