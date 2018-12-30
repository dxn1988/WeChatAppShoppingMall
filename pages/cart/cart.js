var app = getApp()

Page({
  data: {
    isEmpty: true,
    items: [],
    totalPrice: 0.0,
  },
  onLoad: function (options) {
    var vm = this
    vm.updateData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var vm = this
    vm.updateData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  updateData: function () {
    var vm = this
    var isEmpty = app.globalData.cart.length === 0
    vm.setData({
      items: app.globalData.cart,
      isEmpty: isEmpty
    })
    vm.updateTotalPrice()
  },
  increaseAmount: function (e) {
    var vm = this
    var id = e.currentTarget.dataset.id
    var items = vm.data.items
    for (var i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        if (items[i].item.maxUnit > 0 && items[i].quantity + 1 > items[i].item.maxUnit) {
          wx.showToast({
            title: '该商品每人限购 ' + items[i].item.maxUnit + ' ' + items[i].item.itemUnit,
            icon: 'none'
          })
          return
        }
        items[i].quantity += 1
      }
    }
    vm.setData({
      items: items
    })
    vm.updateTotalPrice()
  },
  decreaseAmount: function (e) {
    var vm = this
    var id = e.currentTarget.dataset.id
    var items = vm.data.items
    for (var i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        if (items[i].quantity > 1) {
          items[i].quantity -= 1
        }
      }
    }
    vm.setData({
      items: items
    })
    vm.updateTotalPrice()
  },
  getItemDetailById: function (id) {
    var vm = this
    var items = vm.data.items
    var filterItems = items.filter(item => {
      return item.id == id
    })
    if (filterItems.length != 1) {
      return null
    }
    return filterItems[0]
  },
  updateTotalPrice: function () {
    var vm = this
    var items = vm.data.items
    console.log(items)
    var total = 0.0
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var subTotal = item.quantity * item.item.price
      total += subTotal
    }
    vm.setData({
      totalPrice: total
    })
  },
  removeItem: function(e) {
    var vm = this
    var id = e.currentTarget.dataset.id
    var items = vm.data.items
    items = items.filter(function(e) {
      return e.id !== id
    })
    vm.setData({
      items: items,
      isEmpty: items.length === 0
    })
    app.globalData.cart = items
    this.updateTotalPrice()
  },
  checkInventory() {
    wx.showLoading({
      title: '正在检查库存',
      mask: true
    })
    var data = []
    for (var i = 0; i < this.data.items.length; i++) {
      var item = this.data.items[i]
      data.push({
        id: item.id,
        name: item.item.name,
        quantity: item.quantity
      })
    }
    wx.request({
      url: app.globalData.apiBase + '/item/checkInventory',
      method: 'POST',
      data: data,
      success: res => {
        wx.hideLoading()
        if (res.data.status === 0) {
          wx.navigateTo({
            url: '/pages/mall/order-info/index',
          })
        } else {
          // wx.showToast({
          //   title: res.data.message,
          //   icon: 'none'
          // })
          wx.showModal({
            title: '提示',
            content: res.data.message
          })
        }
      }
    })
  },
  submitOrder: function () {
    this.checkInventory()
  }
})