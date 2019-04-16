Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    isShowList: false,
    list: [{
      name: '辐射服',
      remain: 5,
      borrow: 0,
      imageUrl: '/image/banner.png'
    }, {
      name: '辐射服',
      remain: 0,
      borrow: 0,
      imageUrl: '/image/banner.png'
    }],
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
    let val = this.data.list[index].borrow;
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
      }).filter((item) => {return item.borrow > 0;})
    })
  },
  hideMask: function(e) {
    if (e.currentTarget.id === 'mask') {
      this.setData({
        isShowList: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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