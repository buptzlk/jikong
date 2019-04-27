// pages/my/info-edit.js
const app = getApp();
const User = require('../../service/user.js')
const {
  showErrMsg
} = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    companys: [],
    departments: [],
    politicals: ["群众", "党员", "团员"],
    companyIndex: -1,
    departmentIndex: -1,
    politicalIndex: 0
  },
  bindPoliticalChange: function(e) {
    if (this.data.politicalIndex == e.detail.value) {
      return;
    }
    this.setData({
      politicalIndex: e.detail.value
    })
    let {
      politicals,
      politicalIndex
    } = this.data;
    User.updateUser({
      political: politicals[politicalIndex]
    }).catch((e) => {
      console.log(e);
      showErrMsg(e || '设置身份失败')
    })
  },

  bindCompanyChange: function(e) {
    if (this.data.companyIndex == e.detail.value) {
      return;
    }
    this.setData({
      companyIndex: e.detail.value
    })
    let {
      companys,
      companyIndex
    } = this.data;
    User.updateUser({
      group_id: this.data.companys[companyIndex].id
    }).catch((e) => {
      showErrMsg(e.message || '设置单位失败')
    })
  },
  bindDepartmentChange: function(e) {
    if (this.data.departmentIndex == e.detail.value) {
      return;
    }
    this.setData({
      departmentIndex: e.detail.value
    })
    let {
      departments,
      departmentIndex
    } = this.data;
    User.updateUser({
      department_id: departments[departmentIndex].id
    }).catch((e) => {
      showErrMsg(e.message || '设置科室失败')
    })
  },
  naviAvatar() {
    let url = app.globalData.userInfo.cover_img_url || app.globalData.userInfo.avatarUrl
    wx.navigateTo({
      url: `avatar?avatarUrl=${url}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    this.setData({
      'userInfo': app.globalData.userInfo
    })
    User.getCompanys().then((data) => {
      let companyIndex = -1;
      if (this.data.userInfo.groups) {
        companyIndex = data.findIndex(item => {
          return item.id == this.data.userInfo.group_id
        })
      }
      this.setData({
        companys: data,
        companyIndex
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取单位失败')
    })
    User.getDepartments().then((data => {
      let departmentIndex = -1;
      if (this.data.userInfo.department) {
        departmentIndex = data.findIndex(item => {
          return item.id == this.data.userInfo.department_id
        })
      }
      this.setData({
        departments: data,
        departmentIndex
      })
    })).catch((e) => {
      showErrMsg(e.message || '获取科室失败')
    })
    this.setData({
      'politicalIndex': this.data.politicals.findIndex(function(item) {
        return item == self.data.userInfo.political
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      'userInfo': app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})