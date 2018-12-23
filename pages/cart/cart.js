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
    var isEmpty = vm.data.items.length == 0
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
        if (items[i].item.maxUnit > 0 && items[i].count + 1 > items[i].item.maxUnit) {
          wx.showToast({
            title: '该商品每人限购 ' + items[i].item.maxUnit + ' ' + items[i].item.itemUnit,
            icon: 'none'
          })
          return
        }
        items[i].count += 1
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
        if (items[i].count > 1) {
          items[i].count -= 1
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
      var subTotal = item.count * item.item.price
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
  submitOrder: function () {

  }
})