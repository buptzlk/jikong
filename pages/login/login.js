const { verifyTel } = require('../../utils/verify.js')
const { showErrMsg } = require('../../utils/util.js')
const Tool = require('../../service/tools.js')
const User =  require('../../service/user.js')

Page({
  data: {
    tel: null,
    // captchaUrl: '',
    // captcha: '',
    verifyCode: null,
  },
  onLoad: function () {
    // Tool.getCaptcha().then((data) => {
    //   this.setData({
    //     captchaUrl: data.url
    //   })
    // }).catch((e) => {
    //   console.log(e);
    //   showErrMsg('获取验证码失败')
    // })
  },
  setTel: function(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  // setCaptcha: function (e) {
  //   this.setData({
  //     captcha: e.detail.value
  //   });
  // },
  formSubmit: function (e) {
    if (!e.detail.value.username) {
      showErrMsg('请输入姓名');
      return;
    }
    if (!e.detail.value.tel) {
      showErrMsg('请输入手机号码')
      return;
    } 
    if (!verifyTel(e.detail.value.tel)) {
      showErrMsg('请输入正确的手机号码')
      return;
    } 
    if (!e.detail.value.verifyCode) {
      showErrMsg('请输入验证码')
      return;
    }
    User.register({
      code: e.detail.value.verifyCode,
      name: e.detail.value.username,
      phone: e.detail.value.tel
    }).then(() => {
      wx.switchTab({
        url: '../index/index',
      })
    }).catch((e) => {
      console.log(e);
      showErrMsg(e.message || '登录校验失败')
    })
  },
  sendVerifyCode: function() {
    if (!verifyTel(this.data.tel)) {
      showErrMsg('请输入正确的手机号码')
      return;
    }
    // if (!this.data.captcha) {
    //   showErrMsg('请输入图形验证码')
    //   return;
    // }
    Tool.sendLoginMsg({
      // captcha: this.data.captcha,
      phone: this.data.tel
    }).catch((e) => {
      console.log(e);
      showErrMsg(e.message || '发送验证码失败')
    })
  }
})