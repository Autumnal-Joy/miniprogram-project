// pages/info/info.js
const tools = require("../../utils/tools");

Component({
  behaviors: [],

  properties: {
    personInfo: Object,
    tabIndex: Number,
  },

  observers: {
    personInfo: function (personInfo) {
      this.setData({
        _personInfo: personInfo,
      });
    },
    tabIndex: function (tabIndex) {
      if (tabIndex === 0) {
        tools.wrappedIAC("info");
        if (!this.data.launch) {
          this.setData({ launch: true });
          // 获取用户信息
          wx.getSetting().then(res => {
            if (res.authSetting["scope.userInfo"]) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo().then(res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                });
              });
            }
          });
        }
      }
    },
  },

  data: {
    avatarUrl: "./icons/user.png",
    userInfo: {},
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function (options) {},
    moved: function () {},
    detached: function () {},
    ready: function () {},
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    onGetUserInfo: function (e) {
      if (!this.data.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo,
        });
      }
    },

    delAll() {
      tools.delData();
      wx.reLaunch({
        url: "../tabbar/index",
      }).catch(console.log);
    },
  },
});
