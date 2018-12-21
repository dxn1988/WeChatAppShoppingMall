var app = getApp()

Page({
  data: {
    currentPage: 1,
    totalPage: 0,
    items: [
      {
        id: 1,
        name: '苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果',
        img: '../../../images/apple.jpg',
        desc: '新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买。新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买。新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买，新鲜好吃的苹果快来买。',
        price: 9.9,
        unit: '斤'
      },
      {
        id: 2,
        name: '梨',
        img: '../../../images/pear.jpg',
        desc: '新鲜好吃的梨快来买，新鲜好吃的梨快来买，新鲜好吃的梨快来买，新鲜好吃的梨快来买，新鲜好吃的梨快来买。',
        price: 9.9,
        unit: '斤'
      },
      {
        id: 3,
        name: '香蕉',
        img: '../../../images/banana.jpg',
        desc: '新鲜好吃的香蕉快来买，新鲜好吃的香蕉快来买，新鲜好吃的香蕉快来买，新鲜好吃的香蕉快来买，新鲜好吃的香蕉快来买。',
        price: 9.9,
        unit: '斤'
      },
      {
        id: 99,
        name: '白菜',
        img: '../../../images/bc.jpg',
        desc: '新鲜好吃的白菜快来买，新鲜好吃的白菜快来买，新鲜好吃的白菜快来买，新鲜好吃的白菜快来买，新鲜好吃的白菜快来买。',
        price: 9.9,
        unit: '斤'
      }, 
      {
        id: 100,
        name: '茄子',
        img: '../../../images/eggplant.jpg',
        desc: '新鲜好吃的茄子快来买，新鲜好吃的茄子快来买，新鲜好吃的茄子快来买，新鲜好吃的茄子快来买，新鲜好吃的茄子快来买。',
        price: 9.9,
        unit: '斤'
      },
      {
        id: 105,
        name: '西红柿',
        img: '../../../images/tomato.jpg',
        desc: '新鲜好吃的西红柿快来买，新鲜好吃的西红柿快来买，新鲜好吃的西红柿快来买，新鲜好吃的西红柿快来买，新鲜好吃的西红柿快来买。',
        price: 9.9,
        unit: '斤'
      }
    ]
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    var vm = this
    app.globalData.allItems = vm.data.items
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  addToCart: function(e) {
    console.log(e.currentTarget.dataset.id)
  },
  gotoDetail: function(e) {
    wx.navigateTo({
      url: '/pages/mall/item-detail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})