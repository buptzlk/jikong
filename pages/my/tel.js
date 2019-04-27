// pages/my/tel.js
const Tool = require('../../service/tools.js')
const User = require('../../service/user.js')
const {verifyTel} = require('../../utils/verify.js')
const {showErrMsg} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldTel: null,
    newTel: null,
    vcode: null,
    codeImgUrl: null,
    // imgCode: null
  },

  setNewTel: function(e) {
    this.setData({
      newTel: e.detail.value
    });
  },

  setOldTel: function(e) {
    this.setData({
      oldTel: e.detail.value
    });
  },

  setVcode: function(e) {
    this.setData({
      vcode: e.detail.value
    });
  },

  // setImgCode: function(e) {
  //   this.setData({
  //     imgCode: e.detail.value
  //   });
  // },

  submitForm: function() {
    if (!this.data.newTel || !verifyTel(this.data.newTel)) {
      showErrMsg('请输入新手机号')
      return;
    }
    if (!this.data.oldTel || !verifyTel(this.data.oldTel)) {
      showErrMsg('请输入原手机号')
      return;
    }
    if (!this.data.vcode) {
      showErrMsg('请输入验证码')
      return;
    }
    User.changePhone({
      old_phone: this.data.oldTel,
      new_phone: this.data.newTel,
      code: this.data.vcode
    }).then(() => {
      wx.navigateBack({
        delta: 1
      })
    }).catch(e => {
      showErrMsg(e.message || '修改手机号失败') 
    })
  },

  sendVcode: function() {
    // if (!this.data.imgCode) {
    //   showErrMsg('请输入图型验证码')
    //   return;
    // }
    if (!this.data.newTel || !verifyTel(this.data.newTel)) {
      showErrMsg('请输入新手机号')
      return;
    }
    if (!this.data.oldTel || !verifyTel(this.data.oldTel)) {
      showErrMsg('请输入原手机号')
      return;
    }
    Tool.sendMsg({
      // captcha: this.data.imgCode,
      phone: this.data.newTel	
    }).catch((e) => {
      console.log(e)
      showErrMsg(e || '发送短信验证码失败')
    })
    console.log('send vcode');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Tool.getCaptcha().then((data) => {
      this.setData({
        codeImgUrl: data.url
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取验证码失败')
    })
  }
})