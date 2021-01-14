// pages/index/index.js
const apiTools = require("../../utils/apiTools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
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

  onStart() {
    wx.reLaunch({
      url: "../home/home",
    });
  },

  callHospital() {
    apiTools.call("120");
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
