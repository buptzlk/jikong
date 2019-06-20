// pages/task/direct.js
const Task = require('../../service/task.js')
const {showErrMsg, showSuccMsg} = require('../../utils/util.js') 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: '',
    content: ''
  },
  changeAnswer(e) {
    this.setData({
      answer: e.detail.value
    })
  },
  sign() {
    Task.sign({
      task_id: +this.options.taskId,
      user_answer: this.data.answer
    }).then(() => {
      showSuccMsg('签到成功')
      wx.navigateBack({
        delta: 1
      })
    }).catch(e => {
      showErrMsg(e.message || '签到失败')
    })
  },
  getContent() {
    Task.get({
      index: 0,
      task_id: +this.options.taskId
    }).then((data) => {
      this.setData({
        content: data.directInfo.content
      })
    }).catch(e => {
      showErrMsg(e.message || '获取内容失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getContent()
  },
})