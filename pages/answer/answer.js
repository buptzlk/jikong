const Question = require('../../service/question.js')
const Task = require('../../service/task.js')
const {showErrMsg, showSuccMsg} = require('../../utils/util.js')

Page({
  data: {
    question: null,
    answer: '[]',
    feedContent: '',
    resultContent: '',
  },
  onLoad: function() {
    this.getQuestion()
  },
  getQuestion: function() {
    let request = Question.get
    let params;
    if (this.options.taskId) {
      request = Task.get
      params = {
        task_id: +this.options.taskId,
        index: 0
      }
    }
    request(params).then(data => {
      this.setData({
        answer: '[]',
        question: data
      })
    }).catch(e => {
      showErrMsg(e.message || '获取题目失败')
    })
  },
  showFeedbackModal() {
    this.feedModal.show()
  },
  changeFeedContent(e) {
    this.setData({
      feedContent: e.detail.value
    })
  },
  feedback() {
    if (!this.data.feedContent) {
      showErrMsg('请填写反馈内容')
      return;
    }
    Question.feedback({
      content: this.data.feedContent,
      question_id: this.data.question.id
    }).then(() => {
      this.setData({
        feedContent: '',
      })
      showSuccMsg('反馈成功')
    }).catch(e => {
      showErrMsg(e.message || '反馈失败')
    })
    this.feedModal.hide()
  },
  cancelFeedback() {
    this.setData({
      feedContent: ''
    })
  },
  radioChange(e) {
    this.setData({
      answer: `[${e.detail.value}]`
    })
  },
  checkboxChange(e) {
    this.setData({
      answer: `[${e.detail.value}]`
    })
  },
  submit() {
    if (this.data.answer == '[]') {
      showErrMsg('请作答后再提交')
      return;
    }
    Question.submit({
      question_id: this.data.question.id,
      answer: this.data.answer,
      task_id: this.options.taskId
    }).then((data) => {
      let resultContent = ''
      if (data.isCorrect) {
        resultContent = '恭喜您答对了！'
      } else {
        resultContent = `答错了，正确答案为${data.correctAnswer}。`
      }
      this.setData({
        resultContent,
      })
      this.resultModal.show()
    }).catch(e => {
      showErrMsg(e.message || '提交答案失败')
    })
  },
  next() {
    this.resultModal.hide()
    this.getQuestion()
  },
  exitAnswer() {
    this.resultModal.hide()
    wx.navigateBack({
      delta: 1
    })
  },
  onReady() {
    this.feedModal = this.selectComponent("#feedModal");
    this.resultModal = this.selectComponent("#resultModal");
  }
})