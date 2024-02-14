/**
 * Subtrades.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    status: {
      type: "number",
      defaultsTo: 1,
    },
    updated_at: {
      type: "ref",
      // allowNull: true,
      columnType: "timestamp",
    },
  },
};
