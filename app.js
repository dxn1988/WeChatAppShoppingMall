//app.js
App({
  onLaunch: function () {
    var vm = this
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          vm.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        vm.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () {
            vm.gotoIndex()
          }
        })
      } else {
        vm.globalData.isConnected = true
        wx.hideToast()
      }
    })
  },
  globalData: {
    userInfo: null,
    isConnected: true, // 是否连接网络
    appid: "wxa746d117a68b1338",
    cart: [],
    allItems: [],
    apiBase: 'http://127.0.0.1:8080/api'
  },
  gotoIndex: function() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})