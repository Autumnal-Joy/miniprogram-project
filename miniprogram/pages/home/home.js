// pages/home/home.js
const tools = require("../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    person_info: {
      emergencyCall: [],
    },
  },

  onPickerChange(event) {
    this.setData({
      index: event.detail.value,
    });
  },

  makePhoneCall() {
    let phoneNumber = this.data.person_info.emergencyCall[this.data.index];
    wx.makePhoneCall({
      phoneNumber,
    }).catch(console.log);
  },

  callHospital() {
    wx.makePhoneCall({
      phoneNumber: "120",
    }).catch(console.log);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    tools.loadData.call(this, "home.onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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
