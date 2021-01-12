module.exports = {
  call(phoneNumber) {
    return new Promise((resolve, reject) => {
      wx.makePhoneCall({
        phoneNumber,
        success: resolve,
        fail: reject,
      });
    });
  },
};
