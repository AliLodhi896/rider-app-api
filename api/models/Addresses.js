/* eslint-disable camelcase */
/**
 * Addresses.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    webuser_id: { model: "webUsers", required: true },
    flat_info: { type: "string", allowNull: true },
    pocket_info: { type: "string", allowNull: true },
    street_info: { type: "string", allowNull: true },
    landmark: { type: "string", allowNull: true },
    city_id: { type: "number", defaultsTo: 0 },
    contact_person: { type: "string", required: true },
    contact_number: { type: "string", required: true },
    suggestion: { type: "string", allowNull: true },
    status: { type: "number", defaultsTo: 1 },
    pincode: { type: "number", required: true },
    latitude: { type: "number", allowNull: true },
    longitude: { type: "number", allowNull: true },
    type: { type: "string", allowNull: true },
    location: { type: "string", allowNull: true },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
