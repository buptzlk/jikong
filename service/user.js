const Http = require('../utils/http.js')
const domain = 'https://www.knowalker.com/api/'
const app = getApp();

function filterUndifinedKey(obj) {
  let newObj = {};
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] != 'undefined') {
      newObj[item] = obj[item]
    }
  })
  return newObj;
}
module.exports = {
  login: function({
    code,
    iv,
    encryptedData
  }) {
    return Http.post(domain + 'login', {
      code,
      iv,
      encryptedData
    });
  },
  getUserInfo: function() {
    return Http.post(domain + 'page/my', {
      open_id: app.globalData.openid
    });
  },
  register: function({
    name,
    phone,
    code
  }) {
    return Http.post(domain + 'register', {
      name,
      phone,
      code
    });
  },
  changePhone: function({
    new_phone,
    old_phone,
    code
  }) {
    return Http.post(domain + 'user/changePhone', {
      new_phone,
      old_phone,
      code,
      open_id: app.globalData.openid
    });
  },
  updateUser: function({
    cover_img_url,
    group_id,
    department,
    political
  }) {
    let data = filterUndifinedKey({
      cover_img_url,
      group_id,
      department,
      political
    });
    data.open_id = app.globalData.openid
    return Http.post(domain + 'user/update', data);
  }
}