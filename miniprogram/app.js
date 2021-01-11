//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "chuyan-5g4flozv2fa0a4f5",
      traceUser: true,
    });

    this.globalData = {
      language: "",
    };
  },
});
