/**
 * Runners.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: "number",
      required: true,
    },
    store_id: {
      type: "number",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    mobile: {
      type: "string",
      required: true,
    },
    otp: {
      type: "string",
      // required: true,
      allowNull: true,
    },
    token: {
      type: "string",
      // required: true,
      allowNull: true,
    },
    password: {
      type: "string",
      // required: true,
      allowNull: true,
    },
    status: {
      type: "number",
      defaultsTo: 1,
    },
    declaration: {
      type: "json", // Assuming your database supports JSON data type
      columnType: "json",
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
