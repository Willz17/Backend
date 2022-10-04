const place_model = require("../models/place");
const cities = require("../utils/fetchCities");

const dummy = [
  {
    pid: 23214,
    name: "Sweden",
    coordinates: {
      lat: 23.556,
      long: 55.5,
    },
    time: new Date().toDateString(),
    owner: 11, //crypto.randomUUID()
  },
];

const getAllPlaces = (req, res, next) => {
  const places = cities.getCities();
  res.json(places);
};

const getPlaceByPID = (req, res, next) => {
  console.log(req.params.pid);

  dummy.find((place) => {
    if (place.pid == req.params.pid) return res.json({ place });
    else {
      const error = new Error("Place not found");
      error.code = 404;
      next(error);
    }
  });
};

const getPlaceByUID = (req, res, next) => {
  dummy.find((place) => {
    if (place.owner == req.params.uid) return res.json({ place });
    else {
      const error = new Error("User doesn't have no saved places");
      error.code = 404;
      next(error);
    }
  });
};

const addNewPlace = async (req, res, next) => {
  try {
    const { pid, name, coordinates, time, owner } = req.body;

    const placeObj = new place_model({
      pid: pid,
      name: name,
      coordinates: coordinates,
      time: time,
      user_id: owner,
    });

    const place = await placeObj.save();

    res.send(place);
  } catch (error) {
    const e = new Error(error.message);
    next(e);
  }
};

module.exports.getAllPlaces = getAllPlaces;
module.exports.getPlaceByPID = getPlaceByPID;
module.exports.getPlaceByUID = getPlaceByUID;
module.exports.addNewPlace = addNewPlace;
