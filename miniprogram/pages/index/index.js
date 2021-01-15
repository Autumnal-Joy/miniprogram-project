// pages/index/index.js
const tools = require("../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shouting: false,
    paused: false,
    IAC: null,
    swiper_items: [
      {
        key: 0,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/people.png",
      },
      {
        key: 1,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/helper.jpg",
      },
      {
        key: 2,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/info.jpg",
      },
      {
        key: 3,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/locate.jpg",
      },
      {
        key: 4,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/remind.jpg",
      },
      {
        key: 5,
        url:
          "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/pages/index/images/switch.jpg",
      },
    ],
  },

  onStart(e, options) {
    options = options || "";
    console.log(options);
    wx.reLaunch({
      url: "../home/home" + options,
    }).catch(console.log);
  },

  callHospital() {
    wx.makePhoneCall({
      phoneNumber: "120",
    })
      .then(() => {
        this.onStart(null, "?shouting=true");
      })
      .catch(console.log);
  },

  startShouting() {
    let IAC = this.data.IAC;
    IAC.play();
    this.setData({ shouting: true, paused: false });
  },
  pauseShouting() {
    let IAC = this.data.IAC;
    IAC.pause();
    this.setData({ paused: true });
  },
  continueShouting() {
    let IAC = this.data.IAC;
    IAC.play();
    this.setData({ paused: false });
  },
  stopShouting() {
    let IAC = this.data.IAC;
    IAC.stop();
    this.setData({ shouting: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var IAC = wx.createInnerAudioContext();
    IAC.src =
      "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/shouting.m4a";
    IAC.loop = true;
    this.setData({ IAC });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    tools.loadData.call(this, "index.onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.stopShouting();
    this.data.IAC.destroy();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
