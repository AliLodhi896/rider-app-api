/**
 * Challans.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    booking_id: {
      type: "number",
      required: true,
    },
    store_id: {
      type: "number",
      required: true,
    },
    webuser_id: {
      type: "number",
      required: true,
    },
    rider_id: {
      type: "number",
      required: true,
    },
    challan_code: {
      type: "string",
      required: true,
    },
    services: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
    created_at: {
      type: "number",
      columnType: "timestamp",
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
