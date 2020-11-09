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
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      index: 1,
      list: [],
      hasNextPage: 1,
      current_cat_id: null,
    });
    this.getList()
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      index: 1,
      list: [],
      hasNextPage: 1,
      current_cat_id: null,
    });
    this.getList()
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
    if (!this.debounceSearch) {
      this.debounceSearch = debounce(this.search)
    }
    this.debounceSearch()
  },

  search: function() {
    this.setData({
      index: 1,
      list: [],
      hasNextPage: 1,
      current_cat_id: null,
    })
    this.getList()
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
        borrow_num: item.borrow
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
    let key = `list[${index}].borrow`;
    let val = this.data.list[index].borrow || 0;
    if (type == 1) {
      this.setData({
        [key]: val + 1
      });
    } else {
      this.setData({
        [key]: val - 1
      });
    }
    this.setData({
      selectedList: this.data.list.map((item, index) => {
        item.index = index
        return item
      }).filter((item) => {
        return item.borrow > 0;
      })
    })
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
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    let getFun = Material.getMaterialInfo;
    if (this.data.inputVal) {
      getFun = Material.search
    }
    getFun({
      goods_id: this.data.goods_id,
    }).then((data) => {
      let list = this.data.list
      if (this.data.catList.length == 0) {
        this.setData({
          catList: data.catList || []
        })
      }
      this.setData({
        list: list.concat(data.goodsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      console.log(e);
      wx.showToast({
        icon: 'none',
        title: '获取物资信息失败'
      })
    }).then(() => {
      this.loading = false;
      if (this.isPullDownRefresh) {
        this.isPullDownRefresh = false;
        wx.stopPullDownRefresh()
      }
    })
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
    this.getCode()
    this.getUserInfo()
    this.login()
    if(options.q) {
      let codeStr = decodeURIComponent(options.q)
      console.log(codeStr)
      let dataAry = codeStr.split("=")
      if(dataAry.length > 1) {
        this.setData(
          {
            goods_id: dataAry[1]
          }
        )
      }
    }
    // let codeStr = decodeURIComponent(options.q)
    this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
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
    if (app.globalData.hasBorrowed) {
      this.setData({
        inputShowed: false,
        inputVal: "",
        isShowList: false,
        index: 1,
        hasNextPage: 1,
        selectedList: []
      })
      this.getList()
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      isShowList: false,
      index: 1,
      hasNextPage: 1,
      selectedList: []
    })
    this.isPullDownRefresh = true
    this.getList()
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