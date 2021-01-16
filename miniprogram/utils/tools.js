const app = getApp();

module.exports = {
  today,
  loadData,
  updateData,
  delData,
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

function delData() {
  app.globalData.person_info = undefined;
  console.log("删除全局变量");
  wx.clearStorage();
  console.log("删除本地缓存");
  app.globalData.login().then(_openid => {
    wx.cloud
      .database({
        env: "chuyan-5g4flozv2fa0a4f5",
      })
      .collection("person_info")
      .where({
        _openid,
      })
      .remove()
      .catch(console.log);
  });
  console.log("删除云数据库记录");
}

async function wrappedIAC(file) {
  try {
    var abbr = app.globalData.person_info.city.abbr;
  } catch (error) {
    abbr = "Standard";
  }
  let audio_city_mp3, audio_city_m4a, audio_std_mp3;
  try {
    await new Promise((resolve, reject) => {
      audio_city_mp3 = wx.createInnerAudioContext();
      audio_city_mp3.onEnded(() => {
        audio_city_mp3.destroy();
        console.log(`destroy audios/${abbr}/${file}.mp3`, audio_city_mp3);
      });
      audio_city_mp3.onCanplay(() => {
        resolve();
        console.log(`create audios/${abbr}/${file}.mp3`, audio_city_mp3);
      });
      setTimeout(reject, 500);
      audio_city_mp3.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/${abbr}/${file}.mp3`;
    });
    audio_city_mp3.play();
  } catch (error) {
    audio_city_mp3.destroy();
    console.log(`audios/${abbr}/${file}.mp3请求超时`);
    try {
      await new Promise((resolve, reject) => {
        audio_city_m4a = wx.createInnerAudioContext();
        audio_city_m4a.onEnded(() => {
          audio_city_m4a.destroy();
          console.log(`destroy audios/${abbr}/${file}.m4a`, audio_city_m4a);
        });
        audio_city_m4a.onCanplay(() => {
          resolve();
          console.log(`create audios/${abbr}/${file}.m4a`, audio_city_m4a);
        });
        setTimeout(reject, 500);
        audio_city_m4a.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/${abbr}/${file}.m4a`;
        audio_city_m4a.play();
      });
    } catch (error) {
      audio_city_m4a.destroy();
      console.log(`audios/${abbr}/${file}.m4a请求超时`);
      try {
        await new Promise((resolve, reject) => {
          audio_std_mp3 = wx.createInnerAudioContext();
          audio_std_mp3.onEnded(() => {
            audio_std_mp3.destroy();
            console.log(`destroy audios/Standard/${file}.mp3`, audio_std_mp3);
          });
          audio_std_mp3.onCanplay(() => {
            resolve();
            console.log(`create audios/Standard/${file}.mp3`, audio_std_mp3);
          });
          setTimeout(reject, 500);
          audio_std_mp3.src = `cloud://chuyan-5g4flozv2fa0a4f5.6368-chuyan-5g4flozv2fa0a4f5-1304712061/audios/Standard/${file}.mp3`;
        });
        audio_std_mp3.play();
      } catch (error) {
        audio_std_mp3.destroy();
        console.log(`audios/Standard/${file}.mp3请求超时`);
        console.log("音频加载失败");
      }
    }
  }
}
