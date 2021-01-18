// pages/remind/remind.js
const tools = require("../../utils/tools");
const amapFile = require("../../libs/amap-wx.130");

let today = new tools.myDate().today();

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  changeMask() {
    this.setData({
      mask: !this.data.mask,
    });
  },

  notShow() {
    this.changeMask();
    this.setData({
      ["person_info.remindOff"]: true,
      ["person_info.remindTime"]: today,
    });
    tools.updateData.call(this, "remind.notShow");
  },

  async popup() {
    let person_info = this.data.person_info;
    let off = today === person_info.remindTime && person_info.remindOff;
    let needTakeMedicine = (person_info.medicine || []).filter(v => !v.off)
      .length;
    let needRun = person_info.targetStep > this.data.step;
    this.setData({
      mask: !off && (needTakeMedicine || needRun),
    });
    if (!off && needTakeMedicine) {
      await tools.wrappedIAC("takeMedicine");
    }
    if (!off && needRun) {
      tools.wrappedIAC("doExercise");
    }
  },

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

  onSwitch: function (e) {
    let index = e.target.dataset.index;
    let value = e.detail.value;
    this.setData({
      [`person_info.medicine[${index}].off`]: !value,
      [`person_info.medicine[${index}].updateTime`]: today,
    });
    tools.updateData.call(this, "remind.onSwitch");
  },

  stepChange(e) {
    this.setData({
      ["person_info.targetStep"]: e.detail.value,
    });
  },

  setStepTarget() {
    tools.updateData.call(this);
  },

  setWeather() {
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
    // 天气预报;
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

  async setWeRunData() {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setWeather();
    await this.setWeRunData();
    await tools.loadData.call(this, "remind.onShow");
    let flag = false;
    let medicine = (this.data.person_info.medicine || []).map(v => {
      if (today !== v.updateTime) {
        flag = true;
        v.off = undefined;
        v.updateTime = today;
      }
      return v;
    });
    if (flag) {
      this.setData({
        ["person_info.medicine"]: medicine,
      });
      tools.updateData.call(this, "remind.onShow");
    }
    this.popup();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    tools.wrappedIAC("remind");
    await tools.loadData.call(this, "remind.onShow");
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
