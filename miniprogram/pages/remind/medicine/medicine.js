// miniprogram/pages/remind/medicine/medicine.js
const tools = require("../../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Array: ["1", "2", "3"],
    person_info: {
      medicine: [{}],
    },
  },

  sub(e) {
    const index = e.target.dataset.index;
    let target = [...this.data.person_info.medicine];
    target.splice(index, 1);
    this.setData({
      ["person_info.medicine"]: target,
    });
    console.log("更新完毕", target);
  },

  add(e) {
    let target = [...this.data.person_info.medicine];
    target.push({});
    this.setData({
      ["person_info.medicine"]: target,
    });
    console.log("更新完毕", target);
  },

  /**
   * 天数选择
   */
  day: function (e) {
    this.setData({
      [`person_info.medicine[${e.target.dataset.index}].dayIndex`]:
        +e.detail.value + 1,
    });
  },
  /**
   * 次数选择
   */
  times: function (e) {
    this.setData({
      [`person_info.medicine[${e.target.dataset.index}].timesIndex`]:
        +e.detail.value + 1,
    });
  },

  nameChange(e) {
    this.setData({
      [`person_info.medicine[${e.target.dataset.index}].name`]: e.detail.value,
    });
  },

  howmuchChange(e) {
    this.setData({
      [`person_info.medicine[${e.target.dataset.index}].amount`]: e.detail
        .value,
    });
  },

  onUpdate() {
    tools.updateData.call(this, "remind/medicine.onUpdate").then(res => {
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
    tools.loadData.call(this, "medicine.onLoad");
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
