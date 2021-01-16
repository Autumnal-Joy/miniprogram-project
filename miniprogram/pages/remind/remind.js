// pages/remind/remind.js
const tools = require("../../utils/tools");
const amapFile = require("../../libs/amap-wx.130");

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  listenerSwitch: function (e) {
    console.log("switch类型开关当前状态-----", e.detail.value);
  },
  new_mdc: function (options) {
    wx.navigateTo({
      url: "/pages/remind/medicine/medicine",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let amap = new amapFile.AMapWX({
      key: "1100277b2a7f155bee88cd00fcb9397e",
    });
    amap.getWeather({
      success: res => {
        this.setData({
          ["climate.liveData"]: res,
        });
      },
      fail: console.log,
    });
    amap.getWeather({
      type: "forecast",
      success: res => {
        this.setData({
          ["climate.forecast"]: res.forecast,
        });
      },
      fail: console.log,
    });

    wx.getWeRunData({
      timeout: 10000,
    })
      .then(res => {
        wx.cloud
          .callFunction({
            name: "login",
            data: {
              weRunData: wx.cloud.CloudID(res.cloudID),
            },
          })
          .then(res => {
            let weRunDataToday = res.result.event.weRunData.data.stepInfoList.pop();
            console.log(weRunDataToday);
            this.setData({
              weRunDataToday: {
                step: weRunDataToday.step,
                time: new tools.myDate(weRunDataToday.timestamp * 1000).today(),
              },
            });
          });
      })
      .catch(console.log);

    setTimeout(() => {
      console.log(JSON.stringify(this.data.climate, null, 2));
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    tools.wrappedIAC("remind");
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
