const DB = wx.cloud.database().collection("people_info");

module.exports = {
  getPeopleInfo() {
    DB.get({
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {},
    });
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
};
