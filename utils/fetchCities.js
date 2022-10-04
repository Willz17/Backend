const cities = require("cities.json");

const getCities = () => {
  return cities.slice(400, 425);
};

module.exports.getCities = getCities;
