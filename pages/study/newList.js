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
    task_type: null
  },
  getList: function () {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    let request = Study.getStudyList
    let params = {
      index: this.data.index,
      page_size: this.data.page_size,
      cat_id: this.options.cat_id
    }
    request(params).then((data) => {
      let list = this.data.index == 1 ? [] : this.data.list
      this.setData({
        list: list.concat(data.newsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取学习资料失败')
    }).then(() => {
      this.loading = false;
      if (this.isPullDownRefresh) {
        this.isPullDownRefresh = false;
        wx.stopPullDownRefresh()
      }
    })
  },
  naviDetail(e) {
    let id = e.currentTarget.dataset.id
    let url = `./detail?id=${id}`
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList()
    wx.setNavigationBarTitle({
      title: this.options.name,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },
  onPullDownRefresh() {
    console.log('pull down')
    this.setData({
      index: 1,
      hasNextPage: 1,
    })
    this.isPullDownRefresh = true
    this.getList()
  }
})