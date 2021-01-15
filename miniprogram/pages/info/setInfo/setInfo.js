// pages/info/input/input.js
const tools = require("../../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    person_info: {
      name: "",
      birthday: tools.today(-60),
      home: "",
      medicalHistory: [""],
      emergencyCall: [""],
    },
    picker: {
      startDay: tools.today(-120),
      endDay: tools.today(),
    },
  },

  sub(e) {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;
    console.log("更新", type);
    let target = [...this.data.person_info[type]];
    target.splice(index, 1);
    this.setData({
      ["person_info." + type]: target,
    });
    console.log("更新完毕", target);
  },

  add(e) {
    const type = e.target.dataset.type;
    console.log("更新", type);
    let target = [...this.data.person_info[type]];
    target.push("");
    this.setData({
      ["person_info." + type]: target,
    });
    console.log("更新完毕", target);
  },

  onInputChange(e) {
    const type = e.target.dataset.type;
    console.log("更新", type);
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
    console.log("更新完毕", target);
  },

  onPickerChange(e) {
    console.log("更新", "birthday");
    this.setData({
      ["person_info.birthday"]: e.detail.value,
    });
    console.log("更新完毕", e.detail.value);
  },

  onUpdate() {
    tools.updateData.call(this, "info/setInfo.onUpdate").then(res => {
      console.log(res);
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 1000);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tools.loadData.call(this, "info/setInfo.onLoad");
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
