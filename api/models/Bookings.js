/**
 * Bookings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    booking_code: {
      type: "string",
      allowNull: true,
    },
    invoice_id: {
      type: "string",
      defaultsTo: "",
    },
    address_id: {
      model: "addresses",
      required: true,
    },
    store_id: {
      model: "stores",
    },
    webuser_id: {
      model: "webusers",
      required: true,
    },
    pickup_id: {
      type: "number", //Inventory
      required: true,
    },
    drop_id: {
      type: "number", //Inventory
      allowNull: true,
    },
    booking_type: {
      type: "string",
      allowNull: true,
    },
    amount: {
      type: "number",
      allowNull: true,
    },
    addon_amount: {
      type: "number",
      allowNull: true,
    },
    tax: {
      type: "number",
      allowNull: true,
    },
    including_gst: {
      type: "string",
      defaultsTo: "0",
    },
    promo_code: {
      type: "string",
      allowNull: true,
    },
    discount: {
      type: "number",
      allowNull: true,
    },
    express_amount: {
      type: "number",
      allowNull: true,
    },
    final_amount: {
      type: "number",
      allowNull: true,
    },
    total_cloth: {
      type: "number",
      allowNull: true,
    },
    online: {
      type: "number",
      defaultsTo: 0, //0-offline,1-online, 2-App
      // isIn: [0, 1, 2],
    },
    orderthrough_id: {
      type: "number",
      allowNull: true,
    },
    status: {
      type: "number",
      defaultsTo: 1, //1=new order,0=Cancel,2=pick boy assign, 3=In Process,4=order ready,5=drop rider assign,6=out for delivery,7=delivered
      // isIn: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    package: {
      type: "number", //0=normal order,1=package,2=exceed package
      // isIn: [0, 1, 2],
      allowNull: true,
    },
    package_id: {
      // Will be updated when package api is created
      // model: "Packages",
      allowNull: true,
      type: "number",
    },
    payment_status: {
      type: "number", //0 = Pending, 1 = COD, 2 = PayTm, 3 = NetBanking, 4 = cheque, 5 = not done
      defaultsTo: 0,
      isIn: [0, 1, 2, 3, 4, 5],
    },
    pickup_boy_id: {
      allowNull: true,
      type: "number", //will be updated when pickup boy api is created
    },
    drop_boy_id: {
      allowNull: true,
      type: "number", // will be updated when the drop boy api is created
    },
    search_id: {
      allowNull: true,
      type: "number",
    },
    coupon_id: {
      allowNull: true,
      type: "number", // will be updaed when the coupon is created
    },
    wfaddon: {
      type: "string", //Wash & Fold Addons
      allowNull: true,
    },
    wiaddon: {
      type: "string", //Wash & Iron Addons
      allowNull: true,
    },
    dcaddon: {
      type: "string", //Dry Cleaning Addons
      allowNull: true,
    },
    pladdon: {
      type: "string", //Premium Laundry Addons
      allowNull: true,
    },
    wfcloths: {
      allowNull: true,
      type: "number", //Wash & Fold Cloths
    },
    wicloths: {
      allowNull: true,
      type: "number", //Wash & Iron Cloths
    },
    dccloths: {
      allowNull: true,
      type: "number", //Dry Cleaning Cloths
    },
    plcloths: {
      allowNull: true,
      type: "number", //Premium Laundry Cloths
    },
    isexpress: {
      type: "number",
      defaultsTo: 0,
    },
    cancel_at: {
      type: "ref",
      columnType: "timestamp",
    },
    suggestion: {
      type: "string",
      allowNull: true,
    },
    pick_boy_assign_at: {
      // type: "number", // time stamp
      type: "ref",
      columnType: "timestamp",
    },
    pickupdone: {
      type: "number", //0 = Pickup Not Done, 1 = Pickup Done
      defaultsTo: 0,
      isIn: [0, 1],
    },
    pickupdone_at: {
      type: "ref",
      columnType: "timestamp",
    },
    in_process_at: {
      type: "ref",
      columnType: "timestamp",
    },
    order_ready_at: {
      // type: "number", // time stamp
      type: "ref",
      columnType: "timestamp",
    },
    drop_rider_assign_at: {
      // type: "number", // time stamp
      type: "ref",
      columnType: "timestamp",
    },
    out_for_delivery_at: {
      // type: "number", // time stamp
      type: "ref",
      columnType: "timestamp",
    },
    delivered_at: {
      // type: "number", // time stamp
      type: "ref",
      columnType: "timestamp",
    },
    challan_number: {
      type: "number",
      allowNull: true,
    },
    migrated: {
      type: "number",
      defaultsTo: 0,
    },
    updated_at: {
      type: "ref",
      columnType: "timestamp",
    },
    cancellation_note: {
      type: "string",
      allowNull: true,
    },
  },
};
