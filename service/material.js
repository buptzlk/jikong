const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const getMaterialList = function({
  page,
  page_size
}) {
  return Http.post(domain + 'page/goods', {
    open_id: app.globalData.openid,
    page_size,
    page
  })
}

module.exports = {
  getMaterialList
}