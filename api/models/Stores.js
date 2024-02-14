/**
 * Stores.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    storecode: { type: "string" },
    name: { type: "string", required: true },
    user_id: { model: "users", required: true },
    latitude: { type: "number", required: true },
    longitude: { type: "number", required: true },
    address: { type: "string", defaultsTo: " " },
    city_id: { type: "number", required: true },
    owner_name: { type: "string", required: true },
    reg_franchise_name: { type: "string", allowNull: true },
    mobile: { type: "string", required: true },
    on_line_machine: { type: "number", defaultsTo: 0 },
    off_line_machine: { type: "number", defaultsTo: 0 },
    pd_radius: { type: "number", defaultsTo: 0.0 },
    cleanurself_radius: { type: "number", defaultsTo: 0.0 },
    hs_radius: { type: "number", defaultsTo: 0.0 },
    number_order: { type: "number", defaultsTo: 0 },
    number_package: { type: "number", defaultsTo: 0 },
    number_invoice: { type: "number", defaultsTo: 0 },
    status: { type: "number", defaultsTo: 0 },
    gst: { type: "string", allowNull: true },
    bank_name: { type: "string", allowNull: true },
    bank_account: { type: "string", allowNull: true },
    bank_ifsc: { type: "string", allowNull: true },
    bhim_upi: { type: "string", allowNull: true },
    local_area_name_for_seo: { type: "string", allowNull: true },
    franchise: { type: "string", defaultsTo: "UCLEAN" },
    virtual_store: { type: "number", defaultsTo: 0 },
    composite_gst: { type: "number", defaultsTo: 0 },
    last_invoice_fy: { type: "string", allowNull: true },
    updated_at: { type: "ref", columnType: "timestamp" },
  },
};
