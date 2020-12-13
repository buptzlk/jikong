const Examination = require('../../service/examination.js')
const Question = require('../../service/question.js')
const {showErrMsg, showSuccMsg} = require('../../utils/util.js')

Page({
  data: {
    question: null,
    answer: '[]',
    feedContent: '',
    resultContent: '',
    loading: true,
    type: null,
    questionList: [],
    questionIndex: 0,
    examId: null,
    type: null
  },
  onLoad: function(options) {
    if (options.type === 'task') {
      wx.setNavigationBarTitle({
        title: '混合任务卡',
      })
    }
    this.setData({
      questionList: options.question.split(','),
      examId: options.id,
      type: options.type
    })
    this.getQuestion()
  },
  getQuestion: function() {
    wx.showLoading({
      title: '',
    })
    let params = {
      question_id: +this.data.questionList[this.data.questionIndex]
    }
    Examination.getExaminationDetail(params).then((res) => {
      console.log(res)
      this.setData({
        answer: '[]',
        question: res
      })
      wx.hideLoading()
    }).catch((e) => {
      wx.hideLoading()
      showErrMsg(e.message || '获取试卷失败')
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
    let params = {
      question_id: this.data.question.id,
      answer: this.data.answer
    }
    if (this.data.type === 'task') {
      console.log(this.data.examId)
      params.task_id = this.data.examId
    } else {
      params.exam_id = this.data.examId
    }
    Examination.submit(params).then((data) => {
      let resultContent = ''
      if (data.isCorrect) {
        resultContent = '恭喜您答对了！'
      } else {
        resultContent = `答错了，正确答案为${data.correctAnswer}。`
      }
      this.setData({
        resultContent,
        questionIndex: ++this.data.questionIndex
      })
      this.resultModal.show()
    }).catch(e => {
      showErrMsg(e.message || '提交答案失败')
    })
  },
  next() {
    if (this.data.questionIndex == this.data.questionList.length) {
      wx.redirectTo({
        url: '/pages/examination/result'
      })
      return
    }
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