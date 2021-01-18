// components/custom-tab-bar/custom-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
        "pagePath": "pages/info/info",
        "iconPath": "./icons/info.png",
        "selectedIconPath": "./icons/info_s.png"
      },
      {
        "pagePath": "pages/remind/remind",
        "iconPath": "./icons/remind.png",
        "selectedIconPath": "./icons/remind_s.png"
      },
      {
        "pagePath": "pages/home/home",
        "iconPath": "./icons/home.png",
        "selectedIconPath": "./icons/home_s.png"
      },
      {
        "pagePath": "pages/locate/locate",
        "iconPath": "./icons/locate.png",
        "selectedIconPath": "./icons/locate_s.png"
      },
      {
        "pagePath": "pages/route/route",
        "iconPath": "./icons/route.png",
        "selectedIconPath": "./icons/route_s.png"
      }
    ],
  },
  attached() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
