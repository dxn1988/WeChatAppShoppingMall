var app = getApp()
Page({
  data: {
    item: {},
    complex: {},
    complexList: [],
    pickerData: [],
    address: '',
    showPopup: false
  },
  onLoad: function (options) {
    console.log(options)
    var id = parseInt(options.id)
    this.getData(id)
  },
  getData: function(id) {
    wx.showLoading({
      title: '正在载入',
      icon: 'none',
      mask: true
    })
    var vm = this
    wx.request({
      url: app.globalData.apiBase + '/customer/address/' + id,
      success: res => {
        if (res.data.status !== 0) {
          wx.hideLoading()
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
          return
        }
        vm.setData({
          item: res.data.data
        })
        vm.getComplex()
      }
    })
  },
  getComplex: function() {
    var vm = this
    wx.request({
      url: app.globalData.apiBase + '/complex/complex?page=1&itemsPerPage=100',
      success: res => {
        wx.hideLoading()
        if (res.data.status !== 0) {
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
          return
        }
        vm.setData({
          complexList: res.data.data.items
        })
        vm.generatePickerData()
      }
    })
  },
  generatePickerData: function () {
    var cols = []
    for (var i = 0; i < this.data.complexList.length; i++) {
      var item = this.data.complexList[i]
      cols.push(item.name)
      if (item.id === this.data.item.complexId) {
        this.setData({
          complex: item
        })
      }
    }
    this.setData({
      pickerData: cols
    })
  },
  showComplexPopup: function () {
    this.setData({
      showPopup: true
    })
  },
  onChangeMobile: function (e) {
    var item = this.data.item
    item.mobile = e.detail
    this.setData({
      item: item
    })
  },
  onChangeDefault: function (e) {
    var item = this.data.item
    item.isDefault = e.detail ? 1 : 0
    this.setData({
      item: item
    })
  },
  onClosePopup: function () {
    this.setData({
      showPopup: false
    })
  },
  confirmComplex: function (e) {
    var index = e.detail.index
    var complex = this.data.complexList[index]
    var str = complex.provinceName
    if (complex.cityCode !== '') {
      str += complex.cityName
    }
    if (complex.areaCode !== '') {
      str += complex.areaName
    }
    str += complex.name + ' (' + complex.address + ')'
    var item = this.data.item
    item.complexId = complex.id
    item.address = str
    this.setData({
      item: item,
      complex: complex,
      address: str
    })
    this.onClosePopup()
  },
  cancelComplex: function (e) {
    this.onClosePopup()
  },
  submit: function() {
    console.log(this.data.item)
    wx.showLoading({
      title: '正在提交',
      icon: 'none',
      mask: true
    })
    wx.request({
      url: app.globalData.apiBase + '/customer/updateAddress',
      method: 'POST',
      data: this.data.item,
      success: res => {
        wx.hideLoading()
        console.log(res)
        if (res.data.status !== 0) {
          wx.showModal({
            title: '提示',
            content: res.data.message
          })
          return
        }
        wx.showToast({
          title: '地址修改成功',
          duration: 1000,
          complete: () => {
            var pages = getCurrentPages()
            if (pages.length > 1) {
              var prePage = pages[pages.length - 2]
              prePage.updateData()
            }
            wx.navigateBack()
          }
        })
      }
    })
  }
})