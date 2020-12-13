const app = getApp()
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
    task_id: null,
    task_type: null,
  },
  getList: function() {
    Task.getMultiTask().then((res) => {
      this.setData({
        list: res.newsList,
        task_id: res.task_id
      })
    })
  },
  naviDetail(e) {
    let id = e.currentTarget.dataset.id
    let url = `./detail?id=${id}`
    if (this.data.task_id) {
      url += `&taskId=${this.data.task_id}`
    }
    if (this.data.task_type) {
      url += `&taskType=${this.data.task_type}`
    }
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      task_id: options.task_id,
      task_type: options.task_type
    })
  },

  onShow: function() {
    this.getList()
  }
})