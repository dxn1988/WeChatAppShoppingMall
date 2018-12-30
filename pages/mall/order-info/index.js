var app = getApp()

Page({
  data: {
    defaultAddress: {},
    addressStr: '',
    orderItems: [],
    totalPrice: 0,
    totalPriceStr: ''
  },
  onLoad: function (options) {
    this.setData({
      orderItems: app.globalData.cart
    })
    this.getTotalPrice()
    this.getDefaultAddress()
  },
  getDefaultAddress: function() {
    let uid = wx.getStorageSync('uid')
    var vm = this
    wx.request({
      url: app.globalData.apiBase + '/customer/getDefaultAddress?uid=' + uid,
      success: res => {
        console.log(res)
        let data = res.data
        if (data.status === 0) {
          vm.setData({
            'defaultAddress': data.data[0],
            'addressStr': data.data[0].address + ' ' + data.data[0].mobile
          })
        }
      }
    })
  },
  getTotalPrice: function() {
    var total = 0.0
    var items = app.globalData.cart
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var subTotal = item.quantity * item.item.price
      total += subTotal
    }
    this.setData({
      totalPrice: total,
      totalPriceStr: total.toFixed(2) + ''
    })
  },
  submitOrder: function() {
    let uid = wx.getStorageSync('uid')
    let userInfo = wx.getStorageSync('userInfo')
    let token = wx.getStorageSync('token')
    let items = app.globalData.cart
    var vm = this

    var orderItems = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      orderItems.push({
        id: item.id,
        quantity: item.quantity,
        name: item.item.name,
        itemPrice: item.item.price,
        orderPrice: item.item.price,
        totalPrice: item.item.price * item.quantity
      })
    }

    var data = {
      uid: uid,
      totalPrice: this.data.totalPrice,
      orderSource: 'wechatApp',
      token: token,
      nickname: userInfo.nickName,
      mobile: this.data.defaultAddress.mobile,
      address: this.data.defaultAddress.address,
      complexId: this.data.defaultAddress.complexId,
      orderItems: orderItems
    }
    console.log(data)
    wx.request({
      url: app.globalData.apiBase + '/order/order',
      method: 'POST',
      data: data,
      success: res => {
        console.log(res)
        if (res.data.status === 0) {
          wx.showModal({
            title: '订单信息',
            content: '订单提交成功，有效时间为15分钟，请及时为您的订单付款。',
            confirmText: '现在付款',
            cancelText: '稍后付款',
            success(res) {
              if (res.confirm) {
                console.log('现在付款')
              } else if (res.cancel) {
                console.log('稍后付款')
                vm.clearCart()
                wx.switchTab({
                  url: '/pages/cart/cart',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '订单信息',
            showCancel: false,
            content: res.data.message,
          })
        }
      }
    })
  },
  clearCart: function() {
    app.globalData.cart = []
  }
})