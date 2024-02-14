/**
 * Booking_services.js
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
    quantity: {
      type: "number",
      allowNull: true,
    },
    weight: {
      type: "number",
      allowNull: true,
    },
    base_price: {
      type: "number",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
    },
    add_on: {
      type: "number",
      allowNull: true,
    },
    discount: {
      type: "number",
      allowNull: true,
    },
    tax: {
      type: "number",
      // allowNull: true,
      required: true,
    },
    final_amount: {
      type: "number",
      allowNull: true,
    },
    parenttrade_id: {
      type: "number",
      required: true,
    },
    updated_at: {
      type: "ref",
    },
  },
};
