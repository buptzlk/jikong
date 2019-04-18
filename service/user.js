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

const login = function({
  code,
  iv,
  encryptedData
}) {
  return Http.post(domain + 'login', {
    code,
    iv,
    encryptedData
  });
}

const register = function({
  name,
  phone,
  code // 短信验证码
}) {
  return Http.post(domain + 'register', {
    name,
    phone,
    code,
    open_id: app.globalData.openid
  });
}

const getUserInfo = function() {
  return Http.post(domain + 'page/my', {
    open_id: app.globalData.openid
  });
}

const changePhone = function({
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
}

const updateUser = function({
  cover_img_url,
  group_id,
  department_id,
  political
}) {
  let data = filterUndifinedKey({
    cover_img_url,
    group_id,
    department_id,
    political
  });
  data.open_id = app.globalData.openid
  return Http.post(domain + 'user/update', data);
}

const getCompanys = function() {
  return Http.post(domain + 'group/lists', {
    open_id: app.globalData.openid
  });
}

const getDepartments = function() {
  return Http.post(domain + 'department/lists', {
    open_id: app.globalData.openid
  });
}

module.exports = {
  login,
  register,
  getUserInfo,
  changePhone,
  updateUser,
  getCompanys,
  getDepartments
}
