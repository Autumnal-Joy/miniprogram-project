// pages/switch/switch.js
const tools = require("../../utils/tools");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mask: false,
    unset: true,
    region: [
      {
        firstWord: "*",
        cities: [
          {
            abbr: "Standard",
            name: "普通话",
          },
        ],
      },
      {
        firstWord: "A",
        cities: [
          {
            abbr: "AH",
            name: "安徽",
          },
          {
            abbr: "MO",
            name: "澳门",
          },
        ],
      },
      {
        firstWord: "B",
        cities: [
          {
            abbr: "BJ",
            name: "北京",
          },
        ],
      },
      {
        firstWord: "C",
        cities: [
          {
            abbr: "CQ",
            name: "重庆",
          },
        ],
      },
      {
        firstWord: "F",
        cities: [
          {
            abbr: "FJ",
            name: "福建",
          },
        ],
      },
      {
        firstWord: "G",
        cities: [
          {
            abbr: "GS",
            name: "甘肃",
          },
          {
            abbr: "GD",
            name: "广东",
          },
          {
            abbr: "GX",
            name: "广西",
          },
          {
            abbr: "GZ",
            name: "贵州",
          },
        ],
      },
      {
        firstWord: "H",
        cities: [
          {
            abbr: "HI",
            name: "海南",
          },
          {
            abbr: "HE",
            name: "河北",
          },
          {
            abbr: "HA",
            name: "河南",
          },
          {
            abbr: "HL",
            name: "黑龙江",
          },
          {
            abbr: "HB",
            name: "湖北",
          },
          {
            abbr: "HN",
            name: "湖南",
          },
        ],
      },
      {
        firstWord: "J",
        cities: [
          {
            abbr: "JL",
            name: "吉林",
          },
          {
            abbr: "JS",
            name: "江苏",
          },
          {
            abbr: "JX",
            name: "江西",
          },
        ],
      },
      {
        firstWord: "L",
        cities: [
          {
            abbr: "LN",
            name: "辽宁",
          },
        ],
      },
      {
        firstWord: "N",
        cities: [
          {
            abbr: "NM",
            name: "内蒙古",
          },
          {
            abbr: "NX",
            name: "宁夏",
          },
        ],
      },
      {
        firstWord: "Q",
        cities: [
          {
            abbr: "QH",
            name: "青海",
          },
        ],
      },
      {
        firstWord: "S",
        cities: [
          {
            abbr: "SD",
            name: "山东",
          },
          {
            abbr: "SX",
            name: "山西",
          },
          {
            abbr: "SN",
            name: "陕西",
          },
          {
            abbr: "SH",
            name: "上海",
          },
          {
            abbr: "SC",
            name: "四川",
          },
        ],
      },
      {
        firstWord: "T",
        cities: [
          {
            abbr: "TW",
            name: "台湾",
          },
          {
            abbr: "TJ",
            name: "天津",
          },
        ],
      },
      {
        firstWord: "X",
        cities: [
          {
            abbr: "XZ",
            name: "西藏",
          },
          {
            abbr: "HK",
            name: "香港",
          },
          {
            abbr: "XJ",
            name: "新疆",
          },
        ],
      },
      {
        firstWord: "Y",
        cities: [
          {
            abbr: "YN",
            name: "云南",
          },
        ],
      },
      {
        firstWord: "Z",
        cities: [
          {
            abbr: "ZJ",
            name: "浙江",
          },
        ],
      },
    ],
  },

  async changeLanguage(event) {
    this.changeState();
    let city = event.target.dataset.city;
    this.setData({
      ["personInfo.city"]: city,
    });
    tools.updateData.call(this, "switch.changeLanguage");
  },

  changeMask() {
    this.setData({
      mask: !this.data.mask,
    });
  },

  changeState() {
    this.setData({
      unset: !this.data.unset,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tools.loadData.call(this, "switch.onLoad");
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
