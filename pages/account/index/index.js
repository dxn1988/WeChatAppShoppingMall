var app = getApp()
Page({
  data: {
    userInfo: null,
    nickname: '',
  },
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo)
  },
  onShow: function() {
    
  }
})