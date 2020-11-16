
const Material = require('../../service/material.js')
const User = require('../../service/user.js')
const {showErrMsg} = require('../../utils/util.js')

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    isShowList: false,
    index: 1,
    page_size: 10,
    hasNextPage: 1,
    list: [],
    selectedList: [],
    catList: [],
    current_cat_id: null,
    goods_id: '',
    borrow: 0,
    dataId: null,
    open_id: '',
    materialInfo: {}
  },
  toggleBorrowedList: function() {
    if (!this.data.selectedList.length) {
      return;
    }
    this.setData({
      isShowList: !this.data.isShowList
    })
  },
  borrowMaterial: function() {
    if (this.data.selectedList.length == 0) {
      return;
    }
    let goods = this.data.selectedList.map((item) => {
      return {
        goods_id: item.id,
        borrow_num: borrow
      }
    })
    Material.borrow({goods}).then(() => {
      wx.navigateTo({
        url: 'msg_success'
      })
    }).catch((e) => {
      showErrMsg(e.message || '物资借用失败')
    })
  },
  changeNumber: function(e) {
    let index = e.detail.index;
    let type = e.detail.type;
    let val = this.data.borrow || 0;
    if (type == 1) {
      this.setData({
        borrow: val + 1
      });
    } else {
      this.setData({
        borrow: val - 1
      });
    }
    let selectedList = [];
    selectedList.push(this.data.materialInfo)
    this.setData({
      selectedList: selectedList
    })
    if (this.data.borrow === 0) {
      this.setData({
        selectedList: []
      })
    }
    if (this.data.selectedList.length == 0 && this.data.isShowList) {
        this.setData({
          isShowList: false,
        })
    }
  },
  changeSelectedNumber: function(e) {
    let index = e.detail.index;
    let type = e.detail.type;
    let key = `selectedList[${index}].borrow`;
    let val = this.data.selectedList[index].borrow || 0;
    if (type == 1) {
      this.setData({
        [key]: val + 1
      });
    } else {
      this.setData({
        [key]: val - 1
      });
    }
  },
  hideMask: function(e) {
    if (e.currentTarget.id === 'mask') {
      this.setData({
        isShowList: false
      })
    }
  },
  getList: function() {
  },
  getInfo: function() {
    Material.getInfo({
      id: +this.data.dataId,
    }).then((data) => {
      console.log(data)
      this.setData({
        materialInfo: data
      })
    }).catch((e) => {
      wx.showToast({
        icon: 'none',
        title: '获取物资信息失败'
      })
    });
  },
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: res => {
          if(res.code) {
            User.getPhoneNo({
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData
            }).then((res) => {
              wx.setStorageSync('openid', res.openid)
              app.globalData.openid = res.openid
              that.setData({
                open_id: res.openid
              });
              that.getInfo();
            })
          }
        }
      })
    }
  },
  changeCat(e) {
    this.setData({
      inputShowed: false,
      inputVal: "",
      current_cat_id: e.currentTarget.dataset.id,
      isShowList: false,
      index: 1,
      hasNextPage: 1,
      selectedList: []
    })
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      open_id: app.globalData.openid,
      dataId: options.id
    });
    if (this.data.open_id) {
      this.getInfo();
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.hasBorrowed) {
      this.setData({
        inputShowed: false,
        inputVal: "",
        isShowList: false,
        index: 1,
        hasNextPage: 1,
        selectedList: []
      })
      // this.getList()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.hasBorrowed = false
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
  },
  getCode() {
    return new Promise((resolve, reject) => {
      console.log('getCode')
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code;
          resolve()
        },
        fail: () => {
          reject()
        }
      })
    })
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            this.setData({
              hasUserInfo: true
            })
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo
                app.globalData.iv = res.iv
                app.globalData.encryptedData = res.encryptedData
                resolve()
              },
              fail: () => {
                reject()
              }
            })
          } else {
            reject()
          }
        },
        fall: () => {
          reject()
        }
      })
    })
  }, 
  login() {
    if (!app.globalData.code || !app.globalData.iv || !app.globalData.encryptedData) {
      return;
    }
    User.login({
      code: app.globalData.code,
      iv: encodeURIComponent(app.globalData.iv),
      encryptedData: encodeURIComponent(app.globalData.encryptedData)
    }).then((data) => {
      app.globalData.openid = data.openid;
      console.log(data.openid)
      console.log('try')
      wx.setStorageSync('openid', data.openid)
      wx.setStorageSync('isBind', 'true')
    }).catch((e) => {
      console.log('catch')
      if (e && e.status_code == 4003) {
        app.globalData.openid = e.data.openid;
        wx.setStorage('openid', e.data.openid)
        return;
      }
      showErrMsg(e.message || '登录失败');
    })
  }
})