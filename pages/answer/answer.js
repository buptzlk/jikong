Page({
  data: {
    question: {
      type: '单选题',
      desc: '急救病人的车是什么车？',
      choices: [{
        content: '救护车'
      }, {
        content: '卡车'
      }, {
        content: '消防车'
      }],
      answer: '救护车'
    },
    answer_type: 0
  },
  onLoad: function () {
    this.setData({
      answer_type: +this.options.type
    })
  }
})