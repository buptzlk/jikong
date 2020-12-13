const Task = require('../../service/task.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    questionList: [],
    task_id: null,
    modal: {
      confirmText: '已完成',
      content: '',
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
    this.getMultiTask()
  },
  getMultiTask() {
    Task.getMultiTask().then((res) => {
      this.setData({
        newsList: res.newsList,
        questionList: res.questionList,
        task_id: res.task_id
      })
    })
  },
  viewNews() {
    if (this.data.newsList.length) {
      wx.navigateTo({
        url: '/pages/study/mixinList?task_id=' + this.data.task_id + '&task_type=mixin',
      })
    } else {
      this.setData({
        'modal.title': '阅读文章',
        'modal.content': '恭喜您，已经完成阅读文章',
      })
      this.easyModal.show();
    }
  },
  viewAnswer() {
    if (this.data.questionList.length) {
      wx.navigateTo({
        url: '/pages/examination/detail?id=' + this.data.task_id + '&question=' + this.data.questionList + '&type=task',
      })
    } else {
      this.setData({
        'modal.title': '答题',
        'modal.content': '恭喜您，已经完成答题',
      })
      this.easyModal.show();
    }
  },
  confirm() {
    this.easyModal.hide();
  },
  exitTask() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})