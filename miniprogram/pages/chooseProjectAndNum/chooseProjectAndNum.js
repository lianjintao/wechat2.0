// miniprogram/pages/chooseProjectAndNum/chooseProjectAndNum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow_tixi: false,
    listData_tixi:[['单选题', '多选题', '不定项选择题', '主观题']],
    picker_tixi_data:[],

    isShow_tishu: false,
    listData_tishu:[['5', '10', '15', '20', '25', '30']],
    picker_tishu_data:[],

    isShow_nandu: false,
    listData_nandu:[['⭐️ ☆  ☆  ☆  ☆', '⭐️ ⭐️ ☆  ☆  ☆', '⭐️ ⭐️ ⭐️ ☆  ☆','⭐️ ⭐️ ⭐️ ⭐️ ☆','⭐️ ⭐️ ⭐️ ⭐️ ⭐️']],
    picker_nandu_data:[],
  },

  onClickTixiPicker: function() {
    this.setData({
      isShow_tixi: true
    })
  },

  sureCallBack_tixi (e) {
    let data = e.detail
    this.setData({
      isShow_tixi: false,
      picker_tixi_data: e.detail.choosedData,
      picker_tixi_index:JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_tixi () {
    this.setData({
      isShow_tixi: false,
    })
  },

  onClickTishuPicker: function() {
    this.setData({
      isShow_tishu: true
    })
  },

  sureCallBack_tishu (e) {
    let data = e.detail
    this.setData({
      isShow_tishu: false,
      picker_tishu_data: e.detail.choosedData,
      picker_tishu_index:JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_tishu () {
    this.setData({
      isShow_tishu: false,
    })
  },

  onClickNanduPicker: function() {
    this.setData({
      isShow_nandu: true
    })
  },

  sureCallBack_nandu (e) {
    let data = e.detail
    this.setData({
      isShow_nandu: false,
      picker_nandu_data: e.detail.choosedData,
      picker_nandu_index:JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_nandu () {
    this.setData({
      isShow_nandu: false,
    })
  },
})