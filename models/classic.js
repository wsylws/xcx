import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        // 缓存的写入
        this._setLatestIndex(res.index)
        // 最新的期刊每期都写入缓存中
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or Api 写入到缓存
    // key 确定key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        // 模板字符串
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
    
  }
  isFirst(index) {
    return index == 1 ? true : false
  }
  isLatest(index) {
    
    let latestIndex = this._getLatestIndex()
    // 缓存中最近一期的index等于当前的index 
    // 当前期刊是最新一期
    return latestIndex == index ? true : false
  }
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success
    }
    this.request(params)
  }
  _setLatestIndex(index) {
    // 把index同步写入缓存
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    // 读缓存
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {ClassicModel} 