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
    const index = e.target.dataset.index;
    let target = [...this.data.person_info[type]];
    target.push("");
    console.log(type, index, target);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: "person_info",
    })
      .then(res => {
        // 从缓存中获取信息
        console.log(res);
        if (res.data) {
          return res.data;
        } else {
          throw res.data;
        }
      })
      .catch(err => {
        // 缓存获取失败, 从数据库中获取信息
        console.log(err);
        let _id = app.globalData._id;
        if (_id) {
          const DB = wx.cloud.database({
            env: "chuyan-5g4flozv2fa0a4f5",
          });
          return DB.collection("person_info")
            .doc(_id)
            .get()
            .then(res => {
              // 将信息保存至缓存
              return wx.setStorage({
                key: "person_info",
                data: JSON.stringify(res),
              });
            });
        } else {
          // 数据库中无记录
          throw "_id not found";
        }
      })
      .then(res => {
        // 保存至页面数据
        this.setData({
          person_info: JSON.parse(res),
        });
      })
      .catch(console.log);
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
