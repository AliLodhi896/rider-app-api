/**
 * Challan_services.js
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
    challan_id: {
      type: "number",
      required: true,
    },
    rider_id: {
      type: "number",
      required: true,
    },
    challancloth_id: {
      type: "number",
      required: true,
    },
    challan_id: {
      type: "number",
      required: true,
    },
    parenttrade_id: {
      type: "number",
      required: true,
    },
    quantity: {
      type: "number",
      required: true,
    },
    weight: {
      type: "number",
      required: true,
    },
    addons: {
      type: "number",
      required: true,
    },
    status: {
      type: "number",
      required: true,
    },
    created_at: {
      type: "ref",
      columnType: "timestamp",
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
