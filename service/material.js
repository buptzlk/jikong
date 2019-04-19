const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

const getMaterialList = function({
  index,
  page_size
}) {
  return Http.post(domain + 'page/goods', {
    open_id: app.globalData.openid,
    page_size,
    index
  })
}

const borrow = function({
  goods
}) {
  return Http.post(domain + 'goods/borrow', {
    open_id: app.globalData.openid,
    goods
  })
}

const getBorrowList = function({
  index,
  page_size,
  status
}) {
  return Http.post(domain + 'goods/borrowList', {
    open_id: app.globalData.openid,
    index,
    page_size,
    status
  })
}

const getAdminList = function() {
  return Http.post(domain + 'route/adminList', {
    open_id: app.globalData.openid,
    route: 'admin/goods/approve'
  })
}

const remind = function({borrow_id, admin_id}) {
  return Http.post(domain + 'borrow/reminder', {
    open_id: app.globalData.openid,
    borrow_id,
    admin_id
  })
}

module.exports = {
  getMaterialList,
  borrow,
  getBorrowList,
  getAdminList,
  remind
}