import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
var app = getApp();

Page({
  data: {
    itemDetail: {}
  },
  onLoad: function (e) {
    var vm = this
    vm.setData({
      itemDetail: vm.getItemDetailById(e.id)
    })
    console.log(vm.data.itemDetail)
  },
  getItemDetailById: function(id) {
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
    Toast.success('已加入购物车')
    // app.globalData.cart
  }
})