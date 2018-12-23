import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
var utils = require('../../../utils/utils.js')
var app = getApp();

Page({
  data: {
    item: {}
  },
  onLoad: function (e) {
    var vm = this
    vm.setData({
      item: vm.getItemDetailById(e.id)
    })
    console.log(vm.data.item)
  },
  getItemDetailById: function (id) {
    var allItems = app.globalData.allItems
    var filterItems = allItems.filter(item => {
      return item.id == id
    })
    if (filterItems.length != 1) {
      return null
    }
    return filterItems[0]
  },
  addToCart() {
    var vm = this
    utils.addToCart(vm.data.item)
    Toast.success('已加入购物车')
    console.log(app.globalData.cart)
    // app.globalData.cart
  }
})
