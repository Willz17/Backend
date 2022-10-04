const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("places", placeSchema);
