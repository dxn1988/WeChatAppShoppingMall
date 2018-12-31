const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  addToCart: addToCart,
  trim: trim
}

var app = getApp()

function addToCart(item) {
  if (itemIsInCart(item)) {
    return
  }
  app.globalData.cart.push({
    id: item.id,
    item: item,
    quantity: 1
  })
}

function itemIsInCart(item) {
  var items = app.globalData.cart
  if (items.length === 0) {
    return false
  }
  for (var i = 0; i < items.length; i++) {
    if (items[i].id == item.id) {
      return true
    }
  }
  return false
}

function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '')
}
