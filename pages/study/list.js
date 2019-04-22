// pages/study/list.js
const Study = require('../../service/study.js')
const {showErrMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 1,
    page_size: 10,
    hasNextPage: 1
  },
  getList: function() {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    Study.getStudyList({
      index: this.data.index,
      page_size: this.data.page_size
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.newsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取学习资料失败')
    }).then(() => {
      this.loading = false;
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
})