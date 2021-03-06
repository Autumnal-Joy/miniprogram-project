// pages/locate/locate.js
const tools = require("../../utils/tools");

Component({
  behaviors: [],

  properties: {
    tabIndex: Number,
  },

  observers: {
    tabIndex: function (tabIndex) {
      if (tabIndex === 3) {
        tools.wrappedIAC("locate");
      }
    },
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    showLocation() {
      wx.getLocation({
        type: "gcj02",
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          wx.openLocation({
            latitude,
            longitude,
            scale: 18,
          });
        },
      });
    },
  },
});
