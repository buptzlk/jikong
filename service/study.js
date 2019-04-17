const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const getStudyList = function({
  page,
  page_size
}) {
  return Http.post(domain + 'page/study', {
    open_id: app.globalData.openid,
    page_size,
    page
  })
}

module.exports = {
  getStudyList
}