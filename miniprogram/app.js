//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "chuyan-5g4flozv2fa0a4f5",
      traceUser: true,
    });

    this.globalData = {
      _openid: null,
      person_info: null,
      login: async () => {
        let _openid = this.globalData._openid;
        if (_openid) {
          return _openid;
        } else {
          let {
            result: { _openid },
          } = await wx.cloud.callFunction({
            name: "login",
            data: {},
          });
          this.globalData._openid = _openid;
          console.log("获取用户openid", _openid);
          return _openid;
        }
      },
    };
  },
});
