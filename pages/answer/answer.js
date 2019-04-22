const Question = require('../../service/question.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    question: null,
    answer: '[]',
    feedbackModalHidden: true,
    feedContent: '',
    resultContent: '',
    resultModalHidden: true,
  },
  onLoad: function() {
    this.getQuestion()
  },
  getQuestion: function() {
    Question.get().then(data => {
      this.setData({
        question: data
      })
    }).catch(e => {
      showErrMsg(e.message || '获取题目失败')
    })
  },
  showFeedbackModal() {
    this.setData({
      feedbackModalHidden: false
    })
  },
  changeFeedContent(e) {
    this.setData({
      feedContent: e.detail.value
    })
  },
  feedbackModalChange(e) {
    console.log(e)
    if (e.type === 'confirm') {
      console.log(this.data.feedContent)
      this.setData({
        feedContent: '',
        feedbackModalHidden: true
      })
    } else {
      this.setData({
        feedContent: '',
        feedbackModalHidden: true
      })
    }
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
    }
    Question.submit({
      question_id: this.data.question.id,
      answer: this.data.answer
    }).then((data) => {
      let resultContent = ''
      if (data.isCorrenct) {
        resultContent = '恭喜您答对了！'
      } else {
        resultContent = `答错了，正确答案为${data.correctAnswer}。`
      }
      this.setData({
        resultContent,
        resultModalHidden: false
      })
    }).catch(e => {
      showErrMsg(e.message || '提交答案失败')
    })
  },
  next() {
    this.setData({
      resultModalHidden: true
    })
    this.getQuestion()
  },
  exitAnswer() {
    this.setData({
      resultModalHidden: true
    })
    wx.navigateBack({
      delta: 1
    })
  }
})