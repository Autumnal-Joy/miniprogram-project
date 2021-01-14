// pages/home/home.js
const apiTools = require("../../utils/apiTools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    person_info: {
      emergencyCall: [],
    },
  },

  onPickerChange(event) {
    this.setData({
      index: event.detail.value,
    });
  },

  makePhoneCall() {
    let phoneNumber = this.data.phones[this.data.index].number;
    wx.makePhoneCall({
      phoneNumber,
    }).catch(console.log);
  },

  callHospital() {
    wx.makePhoneCall({
      phoneNumber: "120",
    }).catch(console.log);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    console.group("home.onShow");
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
