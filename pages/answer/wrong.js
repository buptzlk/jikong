// pages/answer/wrong.js
const Question = require('../../service/question.js')
const {showErrMsg, showSuccMsg} = require('../../utils/util.js')

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
  getList: function () {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    Question.getWrongList({
      index: this.data.index,
      page_size: this.data.page_size
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.answerInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取错题资料失败')
    }).then(() => {
      this.loading = false;
    })
  },
  learned(e) {
    console.log(e.target.dataset.id)
    Question.learned({
      question_id: e.target.dataset.id
    }).then((data) => {
      showSuccMsg('操作成功')
    }).catch(e => {
      showErrMsg(e.message || '操作失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  }
})