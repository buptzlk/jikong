// pages/task/task.js
const Task = require('../../service/task.js')
const app = getApp()
const {showErrMsg, showSuccMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekTask: {},
    monthTask: {},
    yearTask: {},
    directTask: {},
    modal: {
      confirmText: '已完成',
      content: '',
      task: {}
    }
  },
  getTaskInfo() {
    Task.getTaskList().then((data) => {
      this.setData({
        weekTask: data.weekTask || {},
        monthTask: data.monthTask || {},
        yearTask: data.yearTask || {},
        directTask: data.directTask || {}
      })
    })
  },
  showDetail(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type
    let task = null;
    let modalTitle = ''
    if (type === 'week') {
      task = this.data.weekTask
      modalTitle = '周任务卡'
    } else if (type === 'month') {
      task = this.data.monthTask
      modalTitle = '月任务卡'
    } else if (type === 'year') {
      task = this.data.yearTask
      modalTitle = '年任务卡'
    }
    let confirmText = '确定'
    if (task.isComplete === 0) {
      confirmText = '做任务'
    } else if (task.isComplete === 1) {
      confirmText = '已完成'
    }
    this.setData({
      'modal.title': modalTitle,
      'modal.content': task.taskInfo,
      'modal.confirmText': confirmText,
      'modal.task': task
    })
    this.easyModal.show();
  },
  exitTask() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  confirm() {
    let modal = this.data.modal
    if (modal.task.isComplete === 0) {
      this.easyModal.hide();
      if (modal.task.template === 'question') {
        wx.navigateTo({
          url: `/pages/answer/answer?taskId=${modal.task.task_id}`,
        })
      } else if (modal.task.template === 'news') {
        app.globalData.task_id = modal.task.task_id
        wx.switchTab({
          url: `/pages/study/list`,
        })
      }
      return;
    }
    this.easyModal.hide();
    return;
  },
  naviDirect() {
    let task = this.data.directTask 
    if (task.isComplete === 1) {
      this.setData({
        'modal.title': '定向任务卡',
        'modal.confirmText': '确定',
        'modal.content': task.taskInfo,
        'modal.task': task
      })
      this.easyModal.show();
    } else {
      wx.navigateTo({
        url: `/pages/task/direct?taskId=${task.task_id}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.easyModal = this.selectComponent("#easyModal");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTaskInfo()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})