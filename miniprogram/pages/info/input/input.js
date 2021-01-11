// pages/info/input/input.js
const DB = wx.cloud.database().collection("people_info");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    birthday: 0,
    home: "",
    medicalHistory: [],
    emergencyCall: [],
  },

  updatePeopleInfo() {
    let personId = this.data.personId;
    let name = this.data.name;
    let birthday = this.data.birthday;
    let home = this.data.home;
    let medicalHistory = this.data.medicalHistory;
    let emergencyCall = this.data.emergencyCall;
    DB.doc(personId).update({
      data: {
        name,
        birthday,
        home,
        medicalHistory,
        emergencyCall,
      },
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
    });
  },

  addPeopleInfo() {
    let name = this.data.name;
    let birthday = this.data.birthday;
    let home = this.data.home;
    let medicalHistory = this.data.medicalHistory;
    let emergencyCall = this.data.emergencyCall;
    DB.add({
      data: {
        name,
        birthday,
        home,
        medicalHistory,
        emergencyCall,
      },
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {},
    });
  },

  deletePeopleInfo() {
    let personId = this.data.personId;
    DB.doc(personId).remove({
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
    });
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
