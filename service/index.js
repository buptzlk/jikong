const Http = require('../utils/http.js')
// const domain = 'https://www.btcuee.com/api'
const app = getApp();
const domain = app.globalData.URL + '/api'

module.exports = {
  getHomeInfo: function() {
    return Http.post(domain + '/page/index', {
      open_id: app.globalData.openid
    });
  }
}