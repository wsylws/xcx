import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo  老版 API 
    // button 组件 UI 让用户主动点击Button
    // wx.getUserInfo({
      
    //   success:data => {
    //     console.log(data)
    //   }
    // })
    this.getMyBookCount()
    this.userAuthorized()
    this.getMyFavor()
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then (res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
  // 用户是否授权
  userAuthorized() {
    wx.getSetting({
      success: data=>{
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },
  getUserInfo(event) {
    //console.log(event)
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
    
  }
 
})