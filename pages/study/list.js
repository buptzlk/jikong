// pages/study/list.js
const app = getApp()
const Study = require('../../service/study.js')
const Task = require('../../service/task.js')
const {
  showErrMsg
} = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 1,
    page_size: 10,
    hasNextPage: 1,
    task_id: null,
  },
  getList: function() {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    let request = Study.getStudyList
    let params = {
      index: this.data.index,
      page_size: this.data.page_size
    }
    if (this.data.task_id) {
      request = Task.get
      params.task_id = this.data.task_id
    }
    request(params).then((data) => {
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
  naviDetail(e) {
    let id = e.currentTarget.dataset.id
    let url = `./detail?id=${id}`
    if (this.data.task_id) {
      url += `&taskId=${this.data.task_id}`
    }
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
  },

  onShow: function() {
    this.setData({
      list: [],
      index: 1,
      hasNextPage: 1,
      task_id: null
    })
    if (app.globalData.task_id) {
      this.setData({
        task_id: app.globalData.task_id
      })
    }
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.task_id = null;
  }
})