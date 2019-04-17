const Material = require('../../service/material.js')

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
    selectedList: []
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
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
    wx.navigateTo({
      url: 'msg_success'
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
    Material.getMaterialList({
      index: this.data.index,
      page_size: this.data.page_size
    }).then((data) => {
      this.setData({
        list: this.data.list.concat(data.goodsInfo),
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
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

  }
})