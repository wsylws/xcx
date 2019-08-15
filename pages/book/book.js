import { BookModel } from '../../models/book.js'
import { random } from '../../util/common.js'
// pages/book/book.js
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纯粹callback 回调地狱 return
    // promise 代码风格 多个异步等待合并 不需要层层传递callback
    // aysnc await es2017 小程序不支持
    // 一次调用 多次调用服务器API 链式调用
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList() 
    .then(res => {
      this.setData({
        books: res
      })
    })
    // const hotList = bookModel.getHotList()
    // hotList.then(res => {
    //   console.log(res)
    //   bookModel.getMyBookCount()
    //   .then(res => {
    //     console.log(res)
    //   })
    // })
    // const promise = new Promise((resolve, reject) => {
    //   // pending fulfilled rejected
    //   // 进行中   已成功    已失败
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail:error => reject(error)
    //   })
    // })

    // promise.then(
    //   (res) => console.log(res),
    //   (error) => console.log(error)
    //   )
  },
  onSearch(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  },
  onReachBottom () {
    this.setData({
      more: random(16)
    })
  }
})