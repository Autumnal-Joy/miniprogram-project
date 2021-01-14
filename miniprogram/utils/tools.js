module.exports = {
  today() {
    let D = new Date();
    let year = D.getFullYear().toString();
    let month = (D.getMonth() + 1).toString();
    let date = D.getDate().toString();
    return `${year}-${month.padStart(2, "0")}-${date.padStart(2, "0")}`;
  },
  loadData: async function (app, funcName) {
    console.group(funcName);
    try {
      var { data: person_info } = await wx.getStorage({
        key: "person_info",
      });
      console.log("读取本地缓存", person_info);
    } catch (err) {
      console.log("本地缓存读取失败", err);
      try {
        let _openid = await app.globalData.login();
        let collection = wx.cloud
          .database({
            env: "chuyan-5g4flozv2fa0a4f5",
          })
          .collection("person_info");
        let list = await collection
          .where({
            _openid,
          })
          .get();
        console.log("读取云数据库", list);
        if (list.data.length) {
          person_info = list.data[0];
        } else {
          person_info = {};
        }
      } catch (err) {
        console.log("云数据库读取失败", err);
      } finally {
        try {
          let res = await wx.setStorage({
            key: "person_info",
            data: person_info,
          });
          console.log("设置本地缓存", res);
        } catch (err) {
          console.log("本地缓存设置失败", err);
        }
      }
    } finally {
      this.setData({
        person_info: { ...this.data.person_info, ...person_info },
      });
    }
    console.groupEnd();
  },
};
