const Http = require('../utils/http.js')
// const domain = 'https://www.btcuee.com/api'
const app = getApp();
const domain = app.globalData.URL + '/api'

module.exports = {
  getExaminationList: function() {
    return Http.post(domain + '/exam/list', {
      open_id: app.globalData.openid
    });
  },
  getExaminationDetail: function({
    question_id
  }) {
    return Http.post(domain + '/question/get', {
      open_id: app.globalData.openid,
      question_id
    });
  },
  submit: function({
    question_id,
    answer,
    exam_id,
    task_id
  }) {
    return Http.post(domain + '/question/post', {
      open_id: app.globalData.openid,
      question_id,
      answer,
      exam_id,
      task_id
    });
  }
}