// pages/study/list.js
const app = getApp()
const Study = require('../../service/study.js')
const Task = require('../../service/task.js')
const {
  showErrMsg
} = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 1,
    page_size: 10,
    hasNextPage: 1,
    task_id: null,
    task_type: null,
    cat_id: null,
    navData: [
      { "id": 0,"name": "全部"}
    ],
    hiddenNav: null,
    currentTab: 0,
    navScrollLeft: 0
  },
  getList: function() {
    if (this.data.hasNextPage != 1 || this.loading) {
      return;
    }
    this.loading = true;
    let request = Study.getStudyList
    let params = {
      index: this.data.index,
      page_size: this.data.page_size
    }
    if (this.data.task_id) {
      request = Task.get
      params.task_id = this.data.task_id
    }

    if (this.data.cat_id) {
      params.cat_id = this.data.cat_id
    }

    request(params).then((data) => {
      let list = this.data.index == 1 ? [] : this.data.list
      this.setData({
        list: list.concat(data.newsInfo),
        index: data.page.index,
        hasNextPage: data.page.hasNextPage
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取学习资料失败')
    }).then(() => {
      this.loading = false;
      if (this.isPullDownRefresh) {
        this.isPullDownRefresh = false;
        wx.stopPullDownRefresh()
      }
    })
  },
  getNav: function () {
    let request = Study.getNavList
    let params = {}
    request(params).then((data) => {
      this.setData({
        navData: this.data.navData.concat(data),
      })
    }).catch((e) => {
      showErrMsg(e.message || '获取文章分类失败')
    }).then(() => {
      
    })
  },
  naviDetail(e) {
    let id = e.currentTarget.dataset.id
    let url = `./detail?id=${id}`
    if (this.data.task_id) {
      url += `&taskId=${this.data.task_id}`
    }
    if (this.data.task_type) {
      url += `&taskType=${this.data.task_type}`
    }
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getNav()
    if (app.globalData.task_id) {
      this.getData()
    } else {
      this.getList()
    }
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    var id = event.currentTarget.dataset.id;

    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        cat_id: id,
        index: 1
      })
    }
    this.getList()

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList()
  },
  onPullDownRefresh() {
    console.log('pull down')
    this.setData({
      index: 1,
      hasNextPage: 1,
    })
    this.isPullDownRefresh = true
    this.getList()
  },

  onShow: function() {
    if (this.data.hiddenNav) {
      this.setData({
        hiddenNav: null
      })
    }
    this.getData()
  },

  getData() {
    if (app.globalData.task_id) {
      this.setData({
        task_id: app.globalData.task_id
      })
    }
    if (app.globalData.task_type) {
      let type = app.globalData.task_type
      this.setData({
        task_type: type
      })
      if (type == 'week') {
        this.setData({
          hiddenNav: 'none'
        })
        wx.setNavigationBarTitle({
          title: '周任务卡',
        })
      } else if (type == 'month') {
        wx.setNavigationBarTitle({
          title: '月任务卡',
        })
      } else if (type == 'year') {
        wx.setNavigationBarTitle({
          title: '年任务卡',
        })
      }
      this.setData({
        index: 1,
        hasNextPage: 1,
      })
      this.getList()
    } else {
      wx.setNavigationBarTitle({
        title: '学习',
      })
      if (this.data.task_id) {
        this.setData({
          index: 1,
          hasNextPage: 1,
          task_id: null,
          task_type: null
        })
        this.getList()
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.task_id = null;
    app.globalData.task_type = null;
  }
})