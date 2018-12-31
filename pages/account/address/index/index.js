var app = getApp()
Page({
  data: {
    isEmpty: false,
    items: [],
    showUseButton: false
  },
  onLoad: function (options) {
    if (options.source === 'order') {
      this.setData({
        showUseButton: true
      })
    }
    this.getData()
  },
  onShow: function () {
    
  },
  getData: function() {
    wx.showLoading({
      title: '正在载入',
      mask: true
    })
    let uid = wx.getStorageSync('uid')
    var vm = this
    wx.request({
      url: app.globalData.apiBase + '/customer/getAddress?uid=' + uid,
      success: res => {
        wx.hideLoading()
        console.log(res)
        if (res.data.status === 0) {
          vm.setData({
            items: res.data.data,
            isEmpty: res.data.data.length === 0
          })
        }
      }
    })
  },
  addAddress: function() {
    wx.navigateTo({
      url: '/pages/account/address/add/index',
    })
  },
  editAddress: function(e) {
    wx.navigateTo({
      url: '../edit/index?id=' + e.target.id,
    })
  },
  selectAddress: function(e) {
    var id = parseInt(e.target.id)
    for (var i = 0; i < this.data.items.length; i++) {
      var item = this.data.items[i]
      if (item.id === id) {
        app.globalData.orderAddress = item
      }
    }
    var pages = getCurrentPages()
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2]
      prePage.updateAddress()
    }
    wx.navigateBack()
  },
  updateData() {
    this.getData()
  }
})