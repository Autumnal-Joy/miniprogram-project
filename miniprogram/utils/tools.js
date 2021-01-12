module.exports = {
  today() {
    let D = new Date();
    let year = D.getFullYear().toString();
    let month = (D.getMonth() + 1).toString();
    let date = D.getDate().toString();
    return `${year}-${month.padStart(2, "0")}-${date.padStart(2, "0")}`;
  },
};
