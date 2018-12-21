const app = getApp();
Page({
  bindGetUserInfo: function(e) {
    console.log(e)
    if (!e.detail.userInfo) {
      return
    }
    if (app.globalData.isConnected) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.login()
    } else {
      wx.showToast({
        title: '当前无网络连接',
        icon: 'none'
      })
    }
  },
  // login
  login: function() {
    let vm = this
    let token = wx.getStorageSync('token')
    if (token) {
      wx.request({
        url: app.globalData.apiBase + '/auth/customer/checkToken',
        method: 'POST',
        data: {
          token: token
        },
        success: res => {
          if (res.data.status === 0) {
            wx.navigateBack()
          } else {
            wx.removeStorageSync('token')
            vm.login()
          }
        }
      })
      return
    }
    wx.login({
      success: function(res) {
        var code = res.code
        wx.request({
          url: app.globalData.apiBase + '/auth/code2session',
          method: 'POST',
          data: {
            code: code
          },
          success: function(res) {
            var openid = res.data.data.openid
            var sessionKey = res.data.data.session_key
            vm.registerUser(openid, sessionKey)
          }
        })
      }
    })
  },
  registerUser: function(openid, sessionKey) {
    var userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: app.globalData.apiBase + '/auth/customer/register',
      method: 'POST',
      data: {
        openid: openid,
        sessionKey: sessionKey,
        nickname: userInfo.nickName,
        gender: userInfo.gender
      },
      success: function (res) {
        console.log('[register]')
        console.log(res.data)
        if (res.data.status === 0) {
          wx.setStorageSync('token', res.data.data)
          wx.navigateBack()
        } else {
          wx.showModal({
            title: '提示',
            content: '无法登录，请重试',
            showCancel: false
          })
        }
      }
    })
  }
})