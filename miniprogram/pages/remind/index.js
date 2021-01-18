// pages/remind/remind.js
const tools = require("../../utils/tools");
const amapFile = require("../../libs/amap-wx.130");

let today = new tools.myDate().today();

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
      if (tabIndex === 1) {
        tools.wrappedIAC("remind");
        if (!this.data.launch) {
          this.setData({ launch: true });
          this.popup();
        }
      }
    },
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
    ready: async function () {
      this.setWeather();
      await this.setWeRunData();
      let flag = false;
      let medicine = (this.data._personInfo.medicine || []).map(v => {
        if (today !== v.updateTime) {
          flag = true;
          v.off = undefined;
          v.updateTime = today;
        }
        return v;
      });
      if (flag) {
        this.setData({
          ["_personInfo.medicine"]: medicine,
        });
        this.triggerEvent("updateData", {
          type: "remind.ready",
          data: this.data._personInfo,
        });
      }
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    changeMask() {
      this.setData({
        mask: !this.data.mask,
      });
    },

    notShow() {
      this.changeMask();
      this.setData({
        ["_personInfo.remindOff"]: true,
        ["_personInfo.remindTime"]: today,
      });
      this.triggerEvent("updateData", {
        type: "remind.notShow",
        data: this.data._personInfo,
      });
    },

    async popup() {
      let _personInfo = this.data._personInfo;
      let off = today === _personInfo.remindTime && _personInfo.remindOff;
      let needTakeMedicine = (_personInfo.medicine || []).filter(v => !v.off)
        .length;
      let needRun = _personInfo.targetStep > this.data.step;
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
        [`_personInfo.medicine[${index}].off`]: !value,
        [`_personInfo.medicine[${index}].updateTime`]: today,
      });
      this.triggerEvent("updateData", {
        type: "remind.onSwitch",
        data: this.data._personInfo,
      });
    },

    stepChange(e) {
      this.setData({
        ["_personInfo.targetStep"]: e.detail.value,
      });
    },

    setStepTarget() {
      this.triggerEvent("updateData", {
        type: "remind.setStepTarget",
        data: this.data._personInfo,
      });
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
          let step = decoded.result.event.weRunData.data.stepInfoList.pop()
            .step;
          this.setData({ step });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
});
