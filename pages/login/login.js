const { verifyTel } = require('../../utils/verify.js')

const delayTime = 60;

Page({
  data: {
    timer: delayTime,
    canSendVerify: true,
    tel: null,
    varifyCode: null,
  },
  onLoad: function () {
  },
  setTel: function(e) {
    this.setData({
      tel: e.detail.value
    });
  },
  formSubmit: function (e) {
    console.log(e);
    if (!e.detail.value.username) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    if (!e.detail.value.tel) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 3000
      });
      return;
    } 
    if (!verifyTel(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 3000
      });
      return;
    } 
    if (!e.detail.value.verify) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    console.log('登录校验'); 
  },
  sendVarifyCode: function() {
    // check tel 
    if (!verifyTel(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    if (!this.data.canSendVerify) {
      return;
    }
    this.setData({
      canSendVerify: false
    })
    this.countDown();
    console.log('发送验证码');
  },
  countDown: function() {
    let self = this;
    if (this.data.timer > 0) {
      setTimeout(function() {
        self.setData({
          timer: self.data.timer - 1
        });
        self.countDown();
      }, 1000);
    } else if(!this.data.canSendVerify){
      this.setData({
        timer: delayTime,
        canSendVerify: true
      })
    }
  }
})