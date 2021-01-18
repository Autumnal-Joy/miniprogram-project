// pages/home/home.js
const tools = require("../../utils/tools");

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
      if (tabIndex === 2) {
        tools.wrappedIAC("home");
      }
    },
  },

  data: {
    shouting: false,
    waitShouting: false,
    paused: false,
    index: 0,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      let IAC = wx.createInnerAudioContext();
      IAC.src =
        "cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/shouting.m4a";
      IAC.loop = true;
      this.setData({ IAC });
    },
    moved: function () {},
    detached: function () {
      this.data.IAC.destroy();
    },
    ready: function () {},
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      if (this.data.waitShouting) {
        this.startShouting();
        this.setData({ waitShouting: false });
      }
    },
    hide: function () {},
    resize: function () {},
  },

  methods: {
    onPickerChange(event) {
      this.setData({
        index: event.detail.value,
      });
    },

    makePhoneCall() {
      let phoneNumber = this.data._personInfo.emergencyCall[this.data.index];
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
          this.setData({ waitShouting: true });
          this.stopShouting();
        })
        .catch(console.log);
    },

    speak(e) {
      tools.wrappedIAC(e.target.dataset.file);
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
  },
});
