const stringfyParams = (params) => {
  return Object.keys(params).map((item) => {
    return `${item}=${params[item]}`;
  }).join('&');
}
const http = (method, url, data) => {
  return new Promise((resolve, reject) => {
    if (method == 'GET') {
      url += '?' + stringfyParams(data);
      data = null;
    }
    wx.request({
      url,
      method,
      data,
      success(res) {
        if (res.data.status_code == 0) {
          resolve(res.data.data);
        } else if (res.data.status_code == 4003){
          wx.redirectTo({
            url: '/pages/login/login',
          })
          reject(res.data);
        } else {
          console.log(res.data)
          reject(new Error(res.data.message));
        }
      },
      fail(err) {
        console.log(err)
        reject(err);
      }
    })
  })
}
const get = (url, params) => {
  return http('GET', url, params);
}
const post = (url, data) => {
  return http('POST', url, data);
}

module.exports = {
  get,
  post,
  http,
}