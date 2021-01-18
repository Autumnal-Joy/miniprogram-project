const app = getApp();

module.exports = {
  myDate,
  loadData,
  updateData,
  delData,
  wrappedIAC,
};

function myDate(...para) {
  let D = new Date(...para);
  this.yearOffset = function (yearOffset = 0) {
    let year = (D.getFullYear() + yearOffset).toString();
    let month = (D.getMonth() + 1).toString().padStart(2, "0");
    let date = D.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${date}`;
  };
  this.today = function () {
    return this.yearOffset();
  };
}

async function loadData(functionName) {
  console.group(functionName);
  try {
    var personInfo = app.globalData.personInfo;
    if (!personInfo) {
      throw "全局变量读取失败";
    }
    console.log("读取全局变量", personInfo);
  } catch (err) {
    console.log(err);
    try {
      var { data: personInfo } = await wx.getStorage({
        key: "personInfo",
      });
      console.log("读取本地缓存", personInfo);
    } catch (err) {
      console.log("本地缓存读取失败", err);
      try {
        let _openid = await app.globalData.login();
        let collection = wx.cloud
          .database({
            env: "chuyan-5g4flozv2fa0a4f5",
          })
          .collection("personInfo");
        let list = await collection
          .where({
            _openid,
          })
          .get();
        console.log("读取云数据库", list);
        if (list.data.length) {
          personInfo = list.data[0];
        } else {
          personInfo = {};
        }
      } catch (err) {
        console.warn("云数据库读取失败", err);
        personInfo = {};
      } finally {
        try {
          let res = await wx.setStorage({
            key: "personInfo",
            data: personInfo,
          });
          console.log("设置本地缓存", res);
        } catch (err) {
          console.warn("本地缓存设置失败", err);
        }
      }
    } finally {
      app.globalData.personInfo = personInfo;
      console.log("设置全局变量", personInfo);
    }
  } finally {
    this.setData({
      personInfo: { ...this.data.personInfo, ...personInfo },
    });
  }
  console.groupEnd();
}

async function updateData(functionName) {
  console.group(functionName);
  try {
    var { data: personInfo } = await wx.getStorage({
      key: "personInfo",
    });
    console.log("读取本地缓存", personInfo);
  } catch (err) {
    console.log("本地缓存读取失败", err);
    personInfo = {};
  } finally {
    personInfo = { ...personInfo, ...this.data.personInfo };
    app.globalData.personInfo = personInfo;
    try {
      console.log("设置本地缓存", personInfo);
      await wx.setStorage({
        key: "personInfo",
        data: personInfo,
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
        .collection("personInfo");

      let list = await collection
        .where({
          _openid,
        })
        .get();
      console.log("读取云数据库", list.data);
      if (list.data.length) {
        let res = await collection.doc(list.data[0]._id).set({
          data: { ...personInfo, _openid: undefined, _id: undefined },
        });
        console.log("更新云数据库", res);
      } else {
        let res = await collection.add({
          data: { ...personInfo, _openid: undefined, _id: undefined },
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
  app.globalData.personInfo = undefined;
  console.log("删除全局变量");
  wx.clearStorage();
  console.log("删除本地缓存");
  app.globalData.login().then(_openid => {
    wx.cloud
      .database({
        env: "chuyan-5g4flozv2fa0a4f5",
      })
      .collection("personInfo")
      .where({
        _openid,
      })
      .remove()
      .catch(console.log);
  });
  console.log("删除云数据库记录");
}

async function wrappedIAC(file) {
  return new Promise(async (res, rej) => {
    try {
      var abbr = app.globalData.personInfo.city.abbr;
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
          res();
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
            res();
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
              res();
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
          rej("音频加载失败");
        }
      }
    }
  }).catch(console.log);
}
