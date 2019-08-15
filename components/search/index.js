import {KeywordModel} from '../../models/keywords.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },
  // 组件生命周期函数 attached 初始化完成后
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),

    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot,
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      // 连续不能发两次请求 强制约束、
      if (this.isLocked()) {
        return 
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        },() => {
          this.unLocked()
        })
      }
      
    },
    
    onCancel(event) {
      // 把组件抛给外面的页面
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      // event.detail.value输入的文本  event.detail.text自定义事件携带的文本
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then( res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },
    onDelete(event) {
      this._closeResult()
      this.initialize()
    },
    onReachBottom () {
      console.log(123123)
    }
  }
})
