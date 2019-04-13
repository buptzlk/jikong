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
    console.log(url);
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        }
      })
    });
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
