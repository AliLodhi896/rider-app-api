/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    status: {
      type: "number",
      defaultsTo: 1,
    },
    franchise_id: {
      type: "number",
      allowNull: true,
    },
    areamanager_id: {
      type: "number",
      allowNull: true,
    },
    storeowner_id: {
      type: "number",
      unique: true,
      allowNull: true,
    },
    vendor_id: {
      type: "number",
      allowNull: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    mobile: {
      type: "string",
      required: true,
    },
    otp: {
      type: "number",
    },
    landline: {
      type: "number",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    remember_token: {
      type: "string",
    },
    ticketit_admin: {
      type: "number",
      defaultsTo: 0,
    },
    ticketit_agent: {
      type: "number",
      defaultsTo: 0,
    },
  },
};
