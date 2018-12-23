var app = getApp()

Page({
  data: {
    currentPage: 1,
    totalPage: 0,
    itemsPerPage: 3,
    showNoMoreGoods: false,
    items: []
  },
  onLoad: function (options) {
    var vm = this
    this.getData()
  },
  onPullDownRefresh: function () {
    this.setData({
      currentPage: 1
    })
  },
  onReachBottom: function () {
    this.loadMore()
  },
  getData: function() {
    var vm = this
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.request({
      url: app.globalData.apiBase + '/item/appitem?page=' + vm.data.currentPage + '&itemsPerPage=' + vm.data.itemsPerPage,
      success: res => {
        wx.hideLoading()
        if (res.data.status !== 0) {
          wx.showToast({
            title: '获取数据失败，请重试',
            icon: 'none'
          })
          return
        }
        console.log(res)
        let goods = vm.data.items
        for (var i = 0; i < res.data.data.items.length; i++) {
          goods.push(res.data.data.items[i])
        }
        var noMoreData = false
        if (vm.data.currentPage + 1 > res.data.data.totalPage) {
          noMoreData = true
        }
        vm.setData({
          totalPage: res.data.data.totalPage,
          currentPage: vm.data.currentPage + 1,
          items: goods,
          showNoMoreGoods: noMoreData
        })
        app.globalData.allItems = goods
      }
    })
  },
  loadMore: function() {
    console.log('[loadMore] ' + this.data.currentPage + ' : ' + this.data.totalPage)
    if (this.data.currentPage <= this.data.totalPage) {
      this.getData()
    }
  },
  addToCart: function(e) {
    console.log(e.currentTarget.dataset.id)
  },
  gotoDetail: function(e) {
    wx.navigateTo({
      url: '/pages/mall/item-detail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})