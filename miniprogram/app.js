//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "chuyan-5g4flozv2fa0a4f5",
      traceUser: true,
    });

    this.globalData = {
      person_info: {},
      openid: null,
    };

    wx.getStorage({
      key: "city",
      success: result => {
        console.log("获取本地缓存 city: " + result.data);
        this.globalData.person_info.city = result.data;
      },
      fail: () => {},
      complete: () => {},
    });
  },
});
