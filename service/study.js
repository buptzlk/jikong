const Http = require('../utils/http.js')
// const domain = 'https://www.btcuee.com/api/'
const app = getApp();
const domain = app.globalData.URL + '/api/'


const getStudyList = function({
  index,
  page_size,
  task_id,
  cat_id,
}) {
  return Http.post(domain + 'page/study', {
    open_id: app.globalData.openid,
    page_size,
    index,
    task_id,
    cat_id
  })
}

const getNavList = function ({

}) {
  return Http.post(domain + 'cat/list', {
    open_id: app.globalData.openid,
  })
}


const getDetail = function({
  id,
  task_id
}) {
  return Http.post(domain + 'news/get', {
    open_id: app.globalData.openid,
    id,
    task_id
  })
}

module.exports = {
  getStudyList,
  getDetail,
  getNavList
}