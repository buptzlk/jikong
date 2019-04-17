const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const getNoticeList = function({
  page,
  page_size
}) {
  return Http.post(domain + 'notice/get', {
    open_id: app.globalData.openid,
    page_size,
    page
  })
}
const readNotice = function({
  notice_id
}) {
  return Http.post(domain + 'notice/read', {
    open_id: app.globalData.openid,
    notice_id
  })
}

module.exports = {
  getNoticeList,
  readNotice
}