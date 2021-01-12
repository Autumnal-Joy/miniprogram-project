module.exports = {
  call(phone) {
    wx.makePhoneCall({
      phoneNumber: phone,
      success: result => {
        console.log("拨号成功:", result);
      },
      fail: () => {
        console.log("拨号失败");
      },
      complete: () => {},
    });
  },
};
