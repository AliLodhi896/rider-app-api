/**
 * Confirm_pickup.js
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
    pickup_done_at: {
      type: "ref",
      columnType: "timestamp",
    },
  },
};
