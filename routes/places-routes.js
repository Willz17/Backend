const express = require("express");

const {
  getPlaceByPID,
  getAllPlaces,
  getPlaceByUID,
  addNewPlace,
} = require("../controllers/places-controller");

const router = express.Router({ mergeParams: true });

// GET places (all)
router.get("/", getAllPlaces);

// GET specific place by place ID (:pid)
router.get("/:pid", getPlaceByPID);

// GET place by user ID (:uid)
router.get("/user/:uid", getPlaceByUID);

// POST new place
router.post("/add", addNewPlace);

module.exports = router;
