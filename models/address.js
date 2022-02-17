const mongoose = require("mongoose");
const db = require("../app/db");

const { Schema, model } = mongoose;

const AddressSchema = new Schema(
  {
    postal_code: { type: String, required: true },
    province: { type: String, required: true },
    street_name: { type: String, required: true },
    town_city: { type: String, required: true },
    unit_complex_number: { type: String },
  },
  { strict: false }
);

const AddressModel = model("Address", AddressSchema);

module.exports = AddressModel;
