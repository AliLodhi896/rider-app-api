/**
 * WebUsers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", allowNull: true },
    email: { type: "string", allowNull: true },
    mobile: { type: "string", required: true },
    device_id: { type: "string", allowNull: true },
    password: { type: "string", allowNull: true },
    sex: { type: "string", allowNull: true },
    dob: { type: "ref", columnType: "date" },
    anniversary: { type: "string", allowNull: true, columnType: "date" },
    gst_no: { type: "string", allowNull: true },
    scm_token: { type: "string", allowNull: true },
    otp: { type: "number", allowNull: true },
    status: { type: "number", defaultsTo: 1 },
    source_id: { type: "number", allowNull: true },
    api_token: { type: "string", allowNull: true },
    promo_notification: { type: "number", defaultsTo: 1 },
    order_notification: { type: "number", defaultsTo: 1 },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
