// pages/home/home.js
const tools = require("../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shouting: false,
    paused: false,
    IAC: null,
    index: 0,
    person_info: {
      city: {
        abbr: "Standard",
        name: "普通话",
      },
    },
  },

  onPickerChange(event) {
    this.setData({
      index: event.detail.value,
    });
  },

  makePhoneCall() {
    let phoneNumber = this.data.person_info.emergencyCall[this.data.index];
    if (phoneNumber) {
      wx.makePhoneCall({
        phoneNumber,
      }).catch(console.log);
    } else {
      wx.showToast({
        title: "请前往个人信息页面填写紧急联系人电话",
        icon: "none",
        duration: 3000,
      });
    }
  },

  callHospital() {
    wx.makePhoneCall({
      phoneNumber: "120",
    })
      .then(() => {
        this.startShouting();
      })
      .catch(console.log);
  },

  speak(e) {
    tools.wrappedIAC(this.data.person_info.city.abbr, e.target.dataset.file);
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
    let IAC = wx.createInnerAudioContext();
    IAC.src =
      "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/shouting.m4a";
    IAC.loop = true;
    this.setData({ IAC });
    if (options.shouting) {
      setTimeout(() => {
        this.startShouting();
      }, 2000);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    tools.loadData.call(this, "home.onShow");
    tools.wrappedIAC(this.data.person_info.city.abbr, "home");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
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
