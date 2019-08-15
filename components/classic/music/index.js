import { classicBeh } from '../classic-beh.js'
// components/classic/music/index.js

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   * 动画 API CSS3
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached: function(event) {
    // mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      // 图片要切换
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function(){
      if(mMgr.paused) {
        this.setData({
          playing:false
        })
        return 
      }
      // 播放音乐与当前期刊的音乐一致
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function() {
      // 播放音乐
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 暂停音乐
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 关掉音乐播放器
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 让一首音乐自然播放完成
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
