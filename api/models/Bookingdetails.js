/**
 * Bookingdetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    booking_id: {
      model: "Bookings",
      required: true,
    },
    total_cloth: {
      type: "number",
      // required: true,
      allowNull: true,
    },
    no_of_wf: {
      type: "number",
      allowNull: true,
    },
    weight_of_wf: {
      type: "number",
      allowNull: true,
    },
    no_of_wi: {
      type: "number",
      allowNull: true,
    },
    weight_of_wi: {
      type: "number",
      allowNull: true,
    },
    weight_of_plkg: {
      type: "number",
      allowNull: true,
    },
    no_of_plkg: {
      type: "number",
      allowNull: true,
    },
    no_of_pl: {
      type: "number",
      allowNull: true,
    },
    no_of_dc: {
      allowNull: true,
      type: "number",
    },
    no_of_sp: {
      type: "number",
      allowNull: true,
    },
    no_of_sppc: {
      type: "number",
      allowNull: true,
    },
    delivery_date: {
      type: "ref",
      columnType: "date",
    },
    delivery_time: {
      allowNull: true,
      type: "string",
    },
    reschedule_date: {
      // allowNull: true,
      type: "ref",
      columnType: "date",
    },
    reschedule_time: {
      allowNull: true,
      type: "string",
    },
    reschedule_resion: {
      type: "string",
      allowNull: true,
    },
    processing_instruction: {
      type: "string",
      allowNull: true,
    },
    pickup_instrution: {
      type: "string",
      allowNull: true,
    },
    drop_instruction: {
      type: "string",
      allowNull: true,
    },
    bill_number: {
      type: "string",
      allowNull: true,
    },
    customer_gst: {
      type: "string",
      allowNull: true,
    },
    express_charge: {
      type: "string",
      allowNull: true,
    },
    customer_feedback: {
      type: "string",
      allowNull: true,
    },
    status: {
      type: "number",
      defaultsTo: 0,
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
    pickup_date: {
      type: "ref",
      columnType: "date",
    },
    pickup_time: {
      type: "string",
      allowNull: true,
    },
  },
};
