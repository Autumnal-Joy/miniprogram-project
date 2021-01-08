// pages/switch/switch.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    language: "",
    set: false,
  },

  // 方法绑定
  onChange(event) {
    this.setData({
      language: event.detail.value,
    });
  },

  onSetLanguage() {
    this.setData({
      set: true,
    });
    app.globalData.language = this.data.language;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      set: false,
      language: app.globalData.language,
    });
  },

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
