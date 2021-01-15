const app = getApp();

module.exports = {
  today,
  loadData,
  updateData,
  wrappedIAC,
};
function today(yearOffset) {
  yearOffset = yearOffset || 0;
  let D = new Date();
  let year = D.getFullYear();
  let month = (D.getMonth() + 1).toString();
  let date = D.getDate().toString();
  return `${year + yearOffset}-${month.padStart(2, "0")}-${date.padStart(
    2,
    "0"
  )}`;
}

async function loadData(functionName) {
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
        console.warn("云数据库读取失败", err);
        person_info = {};
      } finally {
        try {
          let res = await wx.setStorage({
            key: "person_info",
            data: person_info,
          });
          console.log("设置本地缓存", res);
        } catch (err) {
          console.warn("本地缓存设置失败", err);
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
}

async function updateData(functionName) {
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
      console.warn("本地缓存设置失败", err);
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
      console.warn("云数据库更新失败", err);
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
}

async function wrappedIAC(a, file) {
  var IAC1, IAC2, IAC3;
  try {
    await new Promise((resolve, reject) => {
      IAC1 = wx.createInnerAudioContext();
      IAC1.onEnded(() => {
        IAC1.destroy();
        console.log("destroy IAC1", IAC1);
      });
      IAC1.onCanplay(() => {
        resolve();
        console.log("create IAC1", IAC1);
      });
      setTimeout(reject, 500);
      IAC1.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/${app.globalData.person_info.city.abbr}/${file}.mp3`;
    });
    IAC1.play();
  } catch (error) {
    IAC1.destroy();
    try {
      await new Promise((resolve, reject) => {
        IAC2 = wx.createInnerAudioContext();
        IAC2.onEnded(() => {
          IAC2.destroy();
          console.log("destroy IAC2", IAC2);
        });
        IAC2.onCanplay(() => {
          resolve();
          console.log("create IAC2", IAC2);
        });
        setTimeout(reject, 500);
        IAC2.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/${app.globalData.person_info.city.abbr}/${file}.m4a`;
        IAC2.play();
      });
    } catch (error) {
      IAC2.destroy();
      try {
        await new Promise((resolve, reject) => {
          IAC3 = wx.createInnerAudioContext();
          IAC3.onEnded(() => {
            IAC3.destroy();
            console.log("destroy IAC3", IAC3);
          });
          IAC3.onCanplay(() => {
            resolve();
            console.log("create IAC3", IAC3);
          });
          setTimeout(reject, 500);
          IAC3.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/Standard/${file}.mp3`;
        });
        IAC3.play();
      } catch (error) {
        IAC3.destroy();
        console.log("audio error");
      }
    }
  }
}
