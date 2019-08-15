// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 开放出来的数据
    like: {
      type: Boolean,
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    // 封装性 开放性
    // 封装在内部，开放出来的
    // 组件的粒度
    // 可以封装非常简单 也可以非常复杂
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event){
      if (this.properties.readOnly) {
        return 
      }
      // 自定义事件
      let like = this.properties.like
      let count = this.properties.count
      
      count = like?count-1:count+1
      this.setData({
        count: count,
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? "like" : "cancel"
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
