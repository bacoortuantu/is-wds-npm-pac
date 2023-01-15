const VNLicensePlateNumbers = require("./licensePlateNumbers-new.json");

function vietnameseToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from =
    "áàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩđýỳỵỷỹ";
  var to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeooooooooooooooooouuuuuuuuuuuiiiiidyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

/**
 *
 * @param {string} provinceName the name of the province (accepts Vietnamese characters)
 * @returns {}
 */
function getLicensePlateNumber(provinceName) {
  try {
    const slugifyProvince = vietnameseToSlug(provinceName);
    const province = VNLicensePlateNumbers.find(
      (v) => v.province == slugifyProvince
    );
    return province.numbers;
  } catch (error) {
    return -1;
  }
}

module.exports = getLicensePlateNumber;
