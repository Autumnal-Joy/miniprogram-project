module.exports = {
  call(phoneNumber) {
    wx.makePhoneCall({
      phoneNumber,
    }).catch(console.log);
  },
};
