//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "chuyan-5g4flozv2fa0a4f5",
      traceUser: true,
    });

    this.globalData = {
      openid: null,
      person_info_id: null,
      promises: [],
      login: () => {
        return wx.cloud
          .callFunction({
            name: "login",
            data: {},
          })
          .then(res => {
            this.globalData.openid = res.result.openid;
            return res.result.openid;
          })
          .then(res => {
            const DB = wx.cloud.database({
              env: "chuyan-5g4flozv2fa0a4f5",
            });
            return DB.collection("person_info")
              .where({
                _openid: res,
              })
              .get();
          })
          .then(res => {
            if (res.length) {
              this.globalData.person_info_id = res._id;
            }
          })
          .catch(console.log);
      },
    };
    this.globalData.login();
  },
});
