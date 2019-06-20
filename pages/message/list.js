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
    list: [],
    modal: {
      content: ''
    }
  },

  showModal: function(e) {
    let index = e.currentTarget.dataset.index
    let self = this;
    this.setData({
      'currentMsgIndex': index,
      'modal.content': this.data.list[index].content
    })
    this.msgModal.show();
  },
  confirmMsg() {
    let index = this.data.currentMsgIndex
    if (this.data.list[index].status == 1) {
      this.msgModal.hide()
      return;
    }
    let key = `list[${index}].status`;
    this.setData({
      [key]: 1,
    })
    Notice.readNotice({
      notice_id: this.data.list[index].id
    }).catch((e) => {
      showErrMsg(e.message || '标记消息已读失败')
    }).then(() => {
      this.msgModal.hide()
    })
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
  },
  onReady() {
    this.msgModal = this.selectComponent("#msgModal");
  }
})