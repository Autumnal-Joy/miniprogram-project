// pages/remind/remind.js
const tools = require("../../utils/tools");
const amapFile = require("../../libs/amap-wx.130");

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  setText(data) {
    let t = data.temperature;
    let w = +/\d/.exec(data.windpower);
    let text = {};
    if (t <= 5) {
      text.temp = "寒冷";
      text.clothes = "coat";
      text.sick = "极易发";
      text.remind = "记得穿厚点";
    } else if (t <= 15) {
      text.temp = "凉";
      text.clothes = "sweater";
      text.sick = "较易发";
      text.remind = "及时加衣服哦";
    } else if (t <= 25) {
      text.temp = "舒适";
      text.clothes = "shirt";
      text.sick = "易发";
      text.remind = "别忘了保暖哦";
    } else {
      text.temp = "炎热";
      text.clothes = "T-shirt";
      text.sick = "不易发";
      text.remind = "及时减衣服哦";
    }
    if (w <= 1) {
      text.wind = "微风";
    } else if (w <= 4) {
      text.wind = "弱风";
    } else if (w <= 6) {
      text.wind = "和风";
    } else {
      text.wind = "强风";
    }
    this.setData({ text });
  },

  listenerSwitch: function (e) {
    console.log("switch类型开关当前状态-----", e.detail.value);
  },

  new_mdc: function (options) {
    wx.navigateTo({
      url: "/pages/remind/medicine/medicine",
    });
  },

  stepChange(e) {
    this.setData({
      ["person_info.targetStep"]: e.detail.value,
    });
  },

  updateWalk() {
    tools.updateData.call(this);
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
          ["climate.liveData"]: res.liveData,
        });
        this.setText(res.liveData);
      },
      fail: console.log,
    });

    // 天气预报
    // amap.getWeather({
    //   type: "forecast",
    //   success: res => {
    //     this.setData({
    //       ["climate.forecast"]: res.forecast,
    //     });
    //   },
    //   fail: console.log,
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    tools.loadData.call(this, "remind.onShow");
    tools.wrappedIAC("remind");

    if (this.data.step === undefined) {
      try {
        await wx.authorize({
          scope: "scope.werun",
        });
        let encoded = await wx.getWeRunData({
          timeout: 10000,
        });
        let decoded = await wx.cloud.callFunction({
          name: "login",
          data: {
            weRunData: wx.cloud.CloudID(encoded.cloudID),
          },
        });
        let step = decoded.result.event.weRunData.data.stepInfoList.pop().step;
        this.setData({ step });
      } catch (err) {
        console.log(err);
      }
    }
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
