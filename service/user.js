const Http = require('../utils/http.js')
// const domain = 'https://www.btcuee.com/api/'
const app = getApp();
const domain = app.globalData.URL + '/api/'


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

const myLogin = function({
  code,
  iv,
  encryptedData
}) {
  return Http.post(domain + 'myLogin', {
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
  }).then((data) => {
    app.globalData.userInfo = Object.assign(app.globalData.userInfo, data.userInfo)
    app.globalData.userInfo.cover_img_url = app.globalData.userInfo.cover_img_url || app.globalData.userInfo.avatarUrl
    return data;
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

const getPhoneNo = function({
  code,
  iv,
  encryptedData
}) {
  return Http.post(domain + 'getWeixinphoneNum', {
    code,
    iv,
    encryptedData
  });
}


module.exports = {
  login,
  register,
  getUserInfo,
  changePhone,
  updateUser,
  getCompanys,
  getDepartments,
  myLogin,
  getPhoneNo,
}
