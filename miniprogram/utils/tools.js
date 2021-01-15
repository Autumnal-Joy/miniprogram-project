const app = getApp();

module.exports = {
  today() {
    let D = new Date();
    let year = D.getFullYear().toString();
    let month = (D.getMonth() + 1).toString();
    let date = D.getDate().toString();
    return `${year}-${month.padStart(2, "0")}-${date.padStart(2, "0")}`;
  },
  loadData: async function (functionName) {
    console.group(functionName);
    try {
      var person_info = app.globalData.person_info;
      if (!person_info) {
        throw "全局变量读取失败";
      }
      console.log("读取全局变量", person_info);
    } catch (err) {
      console.log(err);
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
          person_info = {};
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
        app.globalData.person_info = person_info;
        console.log("设置全局变量", person_info);
      }
    } finally {
      this.setData({
        person_info: { ...this.data.person_info, ...person_info },
      });
    }

    console.groupEnd();
  },
  updateData: async function (functionName) {
    console.group(functionName);
    try {
      var { data: person_info } = await wx.getStorage({
        key: "person_info",
      });
      console.log("读取本地缓存", person_info);
    } catch (err) {
      console.log("本地缓存读取失败", err);
      person_info = {};
    } finally {
      person_info = { ...person_info, ...this.data.person_info };
      app.globalData.person_info = person_info;
      try {
        console.log("设置本地缓存", person_info);
        await wx.setStorage({
          key: "person_info",
          data: person_info,
        });
      } catch (err) {
        console.log("本地缓存设置失败", err);
      }
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
        console.log("读取云数据库", list.data);
        if (list.data.length) {
          let res = await collection.doc(list.data[0]._id).set({
            data: { ...person_info, _openid: undefined, _id: undefined },
          });
          console.log("更新云数据库", res);
        } else {
          let res = await collection.add({
            data: { ...person_info, _openid: undefined, _id: undefined },
          });
          console.log("创建云数据库记录", res);
        }
        console.groupEnd();
        return wx.showToast({
          title: "更新成功",
          icon: "success",
          duration: 1000,
        });
      } catch (err) {
        console.log("云数据库更新失败", err);
        console.groupEnd();
        return wx
          .showToast({
            title: "更新失败",
            icon: "error",
            duration: 2000,
          })
          .then(() => {
            throw "更新失败";
          });
      }
    }
  },
};
