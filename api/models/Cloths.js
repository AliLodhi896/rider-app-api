/**
 * Cloths.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    subtrade_id: {
      // type: "string",
      required: true,
      model: "subTrades",
    },
    name: {
      required: true,
      type: "string",
    },
    image: {
      allowNull: true,
      type: "string",
    },
    type: {
      type: "string",
    },
    status: {
      type: "number",
      defaultsTo: 1,
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
