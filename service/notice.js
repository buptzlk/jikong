const Http = require('../utils/http.js')
const domain = 'https://www.btcuee.com/api/'
const app = getApp();

const getNoticeList = function({
  index,
  page_size
}) {
  return Http.post(domain + 'notice/get', {
    open_id: app.globalData.openid,
    page_size,
    index
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