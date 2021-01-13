// pages/switch/switch.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mask: false,
    city: "",
    unset: true,
    region: [
      {
        key: 0,
        firstWord: "A",
        cities: [
          {
            key: 0,
            name: "安徽",
          },
          {
            key: 1,
            name: "澳门",
          },
        ],
      },
      {
        key: 1,
        firstWord: "B",
        cities: [
          {
            key: 0,
            name: "北京",
          },
        ],
      },
      {
        key: 2,
        firstWord: "C",
        cities: [
          {
            key: 0,
            name: "重庆",
          },
        ],
      },
      {
        key: 3,
        firstWord: "F",
        cities: [
          {
            key: 0,
            name: "福建",
          },
        ],
      },
      {
        key: 4,
        firstWord: "G",
        cities: [
          {
            key: 0,
            name: "甘肃",
          },
          {
            key: 1,
            name: "广东",
          },
          {
            key: 2,
            name: "广西",
          },
          {
            key: 3,
            name: "贵州",
          },
        ],
      },
      {
        key: 5,
        firstWord: "H",
        cities: [
          {
            key: 0,
            name: "海南",
          },
          {
            key: 1,
            name: "河北",
          },
          {
            key: 2,
            name: "河南",
          },
          {
            key: 3,
            name: "黑龙江",
          },
          {
            key: 4,
            name: "湖北",
          },
          {
            key: 5,
            name: "湖南",
          },
        ],
      },
      {
        key: 6,
        firstWord: "J",
        cities: [
          {
            key: 0,
            name: "吉林",
          },
          {
            key: 1,
            name: "江苏",
          },
          {
            key: 2,
            name: "江西",
          },
        ],
      },
      {
        key: 7,
        firstWord: "L",
        cities: [
          {
            key: 0,
            name: "辽宁",
          },
        ],
      },
      {
        key: 8,
        firstWord: "N",
        cities: [
          {
            key: 0,
            name: "内蒙古",
          },
          {
            key: 1,
            name: "宁夏",
          },
        ],
      },
      {
        key: 9,
        firstWord: "Q",
        cities: [
          {
            key: 0,
            name: "青海",
          },
        ],
      },
      {
        key: 10,
        firstWord: "S",
        cities: [
          {
            key: 0,
            name: "山东",
          },
          {
            key: 1,
            name: "山西",
          },
          {
            key: 2,
            name: "陕西",
          },
          {
            key: 3,
            name: "上海",
          },
          {
            key: 4,
            name: "四川",
          },
        ],
      },
      {
        key: 11,
        firstWord: "T",
        cities: [
          {
            key: 0,
            name: "台湾",
          },
          {
            key: 1,
            name: "天津",
          },
        ],
      },
      {
        key: 12,
        firstWord: "X",
        cities: [
          {
            key: 0,
            name: "西藏",
          },
          {
            key: 1,
            name: "香港",
          },
          {
            key: 2,
            name: "新疆",
          },
        ],
      },
      {
        key: 13,
        firstWord: "Y",
        cities: [
          {
            key: 0,
            name: "云南",
          },
        ],
      },
      {
        key: 14,
        firstWord: "Z",
        cities: [
          {
            key: 0,
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
      city,
    });

    console.group("switch.changeLanguage");
    try {
      var { data: person_info } = await wx.getStorage({
        key: "person_info",
      });
      console.log("读取本地缓存", person_info);
    } catch (err) {
      console.log("本地缓存读取失败", err);
      person_info = {};
    } finally {
      person_info.city = city;
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
          let res = await collection.doc(list.data[0]._id).update({
            data: {
              city,
            },
          });
          console.log("更新云数据库", res);
        } else {
          let res = await collection.add({
            data: {
              city,
            },
          });
          console.log("创建云数据库记录", res);
        }
      } catch (err) {
        console.log("云数据库设置失败", err);
      }
    }
    console.groupEnd();
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
  onLoad: async function (options) {
    console.group("switch.onload");
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
        city: person_info.city || "",
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
