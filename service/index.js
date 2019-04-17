const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api'
const app = getApp();

module.exports = {
  getHomeInfo: function() {
    return Http.post(domain + '/page/index', {
      open_id: app.globalData.openid
    });
  }
}