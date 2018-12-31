var utils = require('../../../../utils/utils.js')
var app = getApp()

Page({
  data: {
    items: [],
    pickerData: [],
    complexSelected: false,
    address: '',
    selectedComplex: {},
    isDefault: false,
    mobile: '',
    showPopup: false
  },
  onLoad: function (options) {
    this.getData()
  },
  onShow: function () {

  },
  getData: function() {
    wx.showLoading({
      title: '正在载入',
      icon: 'none'
    })
    var vm = this
    wx.request({
      url: app.globalData.apiBase + '/complex/complex?page=1&itemsPerPage=100',
      success: res => {
        wx.hideLoading()
        if (res.data.status === 0) {
          vm.setData({
            items: res.data.data.items
          })
          vm.generatePickerData()
        } else {
          wx.showModal({
            title: '提示',
            content: '获取数据失败，请重试',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        }
      }
    })
  },
  generatePickerData: function() {
    var cols = []
    for (var i = 0; i < this.data.items.length; i++) {
      var item = this.data.items[i]
      cols.push(item.name)
    }
    this.setData({
      pickerData: cols
    })
  },
  showComplexPopup: function() {
    this.setData({
      showPopup: true
    })
  },
  confirmComplex: function(e) {
    var index = e.detail.index
    var complex = this.data.items[index]
    var str = complex.provinceName
    if (complex.cityCode !== '') {
      str += complex.cityName
    }
    if (complex.areaCode !== '') {
      str += complex.areaName
    }
    str += complex.name + ' (' + complex.address + ')'
    this.setData({
      selectedComplex: complex,
      address: str,
      complexSelected: true
    })
    this.onClosePopup()
  },
  cancelComplex: function(e) {
    this.onClosePopup()
  },
  onChangeAddress: function(e) {
    const { picker, value, index } = e.detail
    console.log(index + ': ' + value)
  },
  onChangeMobile: function(e) {
    this.setData({
      mobile: e.detail
    })
  },
  onChangeDefault: function(e) {
    this.setData({
      isDefault: e.detail
    })
  },
  onClosePopup: function() {
    this.setData({
      showPopup: false
    })
  },
  submit: function() {
    if (!this.data.complexSelected) {
      wx.showToast({
        title: '请选择小区',
        icon: 'none'
      })
      return
    }
    let mobileStr = utils.trim(this.data.mobile)
    if (mobileStr.length !== 11) {
      wx.showToast({
        title: '请输入有效手机号码',
        icon: 'none'
      })
      return
    }
    var complex = this.data.selectedComplex
    let uid = wx.getStorageSync('uid')
    var data = {
      uid: uid,
      complexId: complex.id,
      address: this.data.address,
      mobile: mobileStr,
      isDefault: this.data.isDefault ? 1 : 0
    }
    wx.request({
      url: app.globalData.apiBase + '/customer/addAddress',
      method: 'POST',
      data: data,
      success: res => {
        if (res.data.status === 0) {
          wx.showToast({
            title: '地址添加成功',
            duration: 1000,
            complete: () => {
              wx.navigateBack()
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })
        }
      }
    })
  }
})