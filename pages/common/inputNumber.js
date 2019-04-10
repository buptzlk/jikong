// pages/common/inputNumber.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 0
    },
    index: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 0
    },
    min: {
      type: Number,
      value: 0
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeNumber: function(e) {
      let type = e.currentTarget.dataset.type;
      if (type == 0 && this.properties.num == this.properties.min) {
        return;
      }
      if (type == 1 && this.properties.num == this.properties.max) {
        return;
      }
      this.triggerEvent('changeNumber', {index: this.properties.index,
      type});
    },
  }
})
