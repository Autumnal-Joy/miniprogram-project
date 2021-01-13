// pages/info/input/input.js
const tools = require("../../../utils/tools");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    person_info: {
      name: "",
      birthday: "2000-01-01",
      home: "",
      medicalHistory: [""],
      emergencyCall: [""],
    },
    picker: {
      startday: "1900-01-01",
      today: tools.today(),
    },
  },

  sub(e) {
    console.log(e.target.dataset);
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;
    let target = [...this.data.person_info[type]];
    target.splice(index, 1);
    console.log(type, index, target);
    this.setData({
      ["person_info." + type]: target,
    });
  },

  add(e) {
    console.log(e.target.dataset);
    const type = e.target.dataset.type;
    let target = [...this.data.person_info[type]];
    target.push("");
    this.setData({
      ["person_info." + type]: target,
    });
  },

  onInputChange(e) {
    const type = e.target.dataset.type;
    let target = [...this.data.person_info[type]];
    if (type === "medicalHistory" || type === "emergencyCall") {
      const index = e.target.dataset.index;
      target[index] = e.detail.value;
    } else {
      target = e.detail.value;
    }
    this.setData({
      ["person_info." + type]: target,
    });
  },

  onPickerChange(e) {
    this.setData({
      ["person_info.birthday"]: e.detail.value,
    });
  },

  async onUpdate() {
    console.group("info/setInfo.onUpdate");
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
            data: { ...person_info },
          });
          console.log("更新云数据库", res);
        } else {
          let res = await collection.add({
            data: { ...person_info },
          });
          console.log("创建云数据库记录", res);
        }
        wx.showToast({
          title: "更新成功",
          icon: "success",
          duration: 1000,
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              });
            }, 1000);
          },
        });
      } catch (err) {
        console.log("云数据库设置失败", err);
        await wx.showToast({
          title: "更新失败",
          icon: "error",
          duration: 2000,
        });
      }
    }
    console.groupEnd();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.group("info/setInfo.onLoad");
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
