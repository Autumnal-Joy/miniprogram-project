// pages/home/home.js
const { call } = require("../../utils/makePhoneCall");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    phones: [
      {
        key: 0,
        number: 120,
      },
      {
        key: 1,
        number: 110,
      },
      {
        key: 2,
        number: 10086,
      },
    ],
  },

  onPickerChange(event) {
    console.log(event.detail.value);
    this.setData({
      index: event.detail.value,
    });
  },

  makePhoneCall() {
    let phoneNumber = this.data.phones[this.data.index].number;
    console.log(phoneNumber);
    call(phoneNumber);
  },

  callHospital() {
    call(120);
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
  onShow: function () {},

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
