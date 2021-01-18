const tools = require("../../utils/tools");

Page({
  data: {
    tabIndex: 2,
    list: [
      {
        iconPath: "/icons/info.png",
        selectedIconPath: "/icons/info_s.png",
      },
      {
        iconPath: "/icons/remind.png",
        selectedIconPath: "/icons/remind_s.png",
      },
      {
        iconPath: "/icons/home.png",
        selectedIconPath: "/icons/home_s.png",
      },
      {
        iconPath: "/icons/locate.png",
        selectedIconPath: "/icons/locate_s.png",
      },
      {
        iconPath: "/icons/route.png",
        selectedIconPath: "/icons/route_s.png",
      },
    ],
  },

  switchTab(e) {
    let index = e.detail.current;
    if (index != this.data.tabIndex) {
      this.setData({
        tabIndex: index,
      });
    }
  },

  switchNav(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.tabIndex) {
      this.setData({
        tabIndex: index,
      });
    }
  },

  updateData(e) {
    let personInfo = e.detail.data;
    this.setData({ personInfo });
    tools.updateData.call(this, e.detail.type);
  },

  onLoad: function (options) {
    if (options.shouting) {
      setTimeout(() => {
        this.selectComponent("#home").startShouting();
      }, 2000);
    }
  },

  onShow() {
    tools.loadData.call(this, "tabbar");
  },
});
