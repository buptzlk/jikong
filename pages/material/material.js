const Material = require('../../service/material.js')
const {showErrMsg, debounce} = require('../../utils/util.js')

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
    if (!this.debounceSearch) {
      this.debounceSearch = debounce(this.search)
    }
    this.debounceSearch()
  },

  search: function() {
    this.setData({
      index: 1,
      list: [],
      hasNextPage: 1
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
    let getFun = Material.getMaterialList;
    if (this.data.inputVal) {
      getFun = Material.search
    }
    getFun({
      index: this.data.index,
      page_size: this.data.page_size,
      word: this.data.inputVal
    }).then((data) => {
      let list = this.data.index == 1 ? [] : this.data.list
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
    console.log('show')
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
    this.setData({
      index: 1,
      hasNextPage: 1,
    })
    this.isPullDownRefresh = true
    this.getList()
  }
})