const Question = require('../../service/question.js')
const {showErrMsg} = require('../../utils/util.js')

Page({
  data: {
    question: null,
    answer: '[]'
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
      showErrMsg(e || '获取题目失败')
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
    }
    Question.submit({
      question_id: this.data.question.id,
      answer: this.data.answer
    }).then(() => {
      
    }).catch(e => {
      showErrMsg(e || '提交答案失败')
    })
  }
})