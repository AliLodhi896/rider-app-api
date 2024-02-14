/**
 * BookingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// GET PICKUPS
const getPickups = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!req.query.from_date || req.query.from_date == "") {
      return res.status(400).json({
        message: "From Date is mandatory",
        status: "error",
      });
    }
    const from_date = new Date(req.query.from_date).toISOString();

    if (!req.query.to_date || req.query.to_date == "") {
      return res.status(400).json({
        message: "To Date is mandatory",
        status: "error",
      });
    }
    const to_date = new Date(req.query.to_date).toISOString();

    const datastore = sails.getDatastore("default");
    const runner = await Runners.findOne({ token });
    const pickup_boy_id = runner.id;
    let whereClause = `where b.pickup_boy_id = ${pickup_boy_id} AND b.status = 2`;

    whereClause += ` AND (bd.delivery_date >= '${from_date}' AND bd.delivery_date <= '${to_date}')`;

    const query = `select
    b.booking_code, b.booking_type, 
    wu.name, wu.email, wu.mobile, 
    a.flat_info, a.pocket_info, a.street_info, 
    c.name as city_name, a.latitude, a.longitude, 
    bd.pickup_time as timeslot, bd.pickup_date, bd.booking_id
    from bookings b
    LEFT JOIN webusers wu ON(b.webuser_id = wu.id)
    LEFT JOIN addresses a ON(b.address_id = a.id)
    LEFT JOIN cities c ON(a.city_id = c.id)
    LEFT JOIN bookingdetails bd ON(b.id = bd.booking_id)
    ${whereClause} limit 0,10`;

    console.log(query);

    const bookings = await datastore.sendNativeQuery(query);
    return res.status(200).json({
      status: "success",
      pickup_orders: bookings.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get Drop
const getDrop = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const datastore = sails.getDatastore("default");
  try {
    if (!req.query.from_date || req.query.from_date == "") {
      return res.status(400).json({
        message: "From Date is mandatory",
        status: "error",
      });
    }
    const from_date = new Date(req.query.from_date).toISOString();

    if (!req.query.to_date || req.query.to_date == "") {
      return res.status(400).json({
        message: "To Date is mandatory",
        status: "error",
      });
    }
    const to_date = new Date(req.query.to_date).toISOString();

    const runner = await Runners.findOne({ token });
    const drop_boy_id = runner.id;
    let whereClause = `where b.drop_boy_id = ${drop_boy_id} AND b.status = 5`;
    whereClause += ` AND (bd.delivery_date >= '${from_date}' AND bd.delivery_date <= '${to_date}')`;

    const query = `select
    b.booking_code, b.booking_type, 
    wu.name, wu.email, wu.mobile , 
    a.flat_info, a.pocket_info, a.street_info, 
    c.name as city_name, 
    a.latitude, a.longitude, 
    bd.delivery_time as timeslot, b.final_amount, bd.delivery_date, bd.booking_id
    from bookings b
    LEFT JOIN webusers wu ON(b.webuser_id = wu.id)
    LEFT JOIN addresses a ON(b.address_id = a.id)
    LEFT JOIN cities c ON(a.city_id = c.id)
    LEFT JOIN bookingdetails bd ON(b.id = bd.booking_id)
    ${whereClause} limit 0, 10`;

    console.log(query);
    const bookings = await datastore.sendNativeQuery(query);

    return res.status(200).json({
      status: "success",
      drop_order: bookings.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get PickupOrder Details
const getPickupOrderDetails = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const booking_id = req.query.booking_id;

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing booking id parameter",
      });
    }

    const bookingID = await Bookings_services.findOne({
      booking_id: booking_id,
    });
    if (!bookingID) {
      return res.status(404).json({
        status: "error",
        message: "bookig id is not found",
      });
    }

    const query = `select
    b.booking_code, b.booking_type, wu.name, wu.email, wu.mobile, a.flat_info, a.pocket_info, a.street_info, c.name as city_name, a.latitude, a.longitude, bd.pickup_time as timeslot
    from bookings b
    LEFT JOIN webusers wu ON(b.webuser_id = wu.id)
    LEFT JOIN addresses a ON(b.address_id = a.id)
    LEFT JOIN cities c ON(a.city_id = c.id)
    LEFT JOIN bookingdetails bd ON(b.id = bd.booking_id)
    WHERE b.id = ${booking_id}`;

    // console.log(query);

    const bookings = await datastore.sendNativeQuery(query);

    return res.status(200).json({
      status: "success",
      pickup_order: bookings.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get DropOrder Details
const getDropOrderDetails = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const booking_id = req.query.booking_id;

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing booking id parameter",
      });
    }

    const bookingID = await Bookings_services.findOne({
      booking_id: booking_id,
    });
    if (!bookingID) {
      return res.status(404).json({
        status: "error",
        message: "bookig id is not found",
      });
    }

    const query = `select
    b.booking_code, b.booking_type, wu.name, wu.email, wu.mobile, a.flat_info, a.pocket_info, a.street_info, c.name as city_name, a.latitude, a.longitude, bd.pickup_time as timeslot
    from bookings b
    LEFT JOIN webusers wu ON(b.webuser_id = wu.id)
    LEFT JOIN addresses a ON(b.address_id = a.id)
    LEFT JOIN cities c ON(a.city_id = c.id)
    LEFT JOIN bookingdetails bd ON(b.id = bd.booking_id)
    WHERE b.id = ${booking_id}`;

    const bookings = await datastore.sendNativeQuery(query);

    return res.status(200).json({
      status: "success",
      drop_order: bookings.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get SubTrades
const getSubTrades = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const query = `SELECT
        st.id, 
        st.name,
        st.status
      FROM
        subtrades st
     
      `;

    const sub_trades = await datastore.sendNativeQuery(query);
    return res.status(200).json({
      status: "success",
      subtrade_data: sub_trades.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get ParentTrades
const getParentTrades = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const query = `SELECT
        pt.id, 
        pt.name,
        pt.status,
        pt.order,
        pt.package,
        pt.quantity_based_service,
        pt.image_url,
        pt.description,
        pt.short_description
      FROM
        parenttrades pt
      `;

    const parenttrades = await datastore.sendNativeQuery(query);
    return res.status(200).json({
      status: "success",
      parenttrade_data: parenttrades.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get Addon BasedOn ParentTrades
const getAddonBasedOnParentTrades = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const parenttrade_id = req.query.parenttrade_id;

    const query = `
    SELECT 
      a.* 
    FROM 
      addon_parenttrade pt 
      LEFT JOIN addons a ON (pt.addon_id = a.id) 
    WHERE 
      pt.parenttrade_id = ${parenttrade_id}`;

    const getAddonBasedParentTrade = await datastore.sendNativeQuery(query);
    return res.status(200).json({
      status: "success",
      addon_id: getAddonBasedParentTrade.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get Cloths
const getCloths = async (req, res) => {
  try {
    const datastore = sails.getDatastore("default");
    const subtrade_id = req.query.subtrade_id;

    if (!subtrade_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing subtrades id parameter",
      });
    }

    const subtrade = await Cloths.findOne({ id: subtrade_id });
    if (!subtrade) {
      return res.status(400).json({
        status: "error",
        message: "Subtrade id not found",
      });
    }

    const query = `SELECT
        c.name,
        c.image,
        c.type,
        c.status
      FROM
        cloths c
    WHERE c.subtrade_id = ${subtrade_id}`;

    const cloths = await datastore.sendNativeQuery(query);

    return res.status(200).json({
      status: "success",
      cloths_data: cloths.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Preview Challan
// const previewChallan = async (req, res) => {
//   try {
//     const datastore = sails.getDatastore("default");
//     const booking_id = req.query.booking_id;

//     if (!booking_id) {
//       return res.status(400).json({
//         status: "error",
//         message: "Missing booking id parameter",
//       });
//     }

//     const bookingID = await Bookings_services.findOne({
//       booking_id: booking_id,
//     });
//     if (!bookingID) {
//       return res.status(404).json({
//         status: "error",
//         message: "bookig id is not found",
//       });
//     }

//     const query = `select
//     b.booking_code,
//     b.booking_type,
//     wu.name, wu.email,
//     wu.mobile,
//     a.flat_info,
//     a.pocket_info,
//     a.street_info,
//     c.name as city_name
//     from bookings b
//     LEFT JOIN webusers wu ON(b.webuser_id = wu.id)
//     LEFT JOIN addresses a ON(b.address_id = a.id)
//     LEFT JOIN cities c ON(a.city_id = c.id)
//     LEFT JOIN bookings_services bs ON(b.id = bs.booking_id)
//     LEFT JOIN bookingdetails bd ON(b.id = bd.booking_id)
//     WHERE b.id = ${booking_id}`;

//     const bookings = await datastore.sendNativeQuery(query);

//     return res.status(200).json({
//       status: "success",
//       preview_challan: bookings.rows,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// Cancel Pickup
const cancelPickup = async (req, res) => {
  try {
    const booking_id = req.query.booking_id;
    const cancellation_note = req.body.cancellation_note;
    const currentdatetime = new Date();

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing booking id parameter",
      });
    }

    if (!cancellation_note) {
      return res.status(400).json({
        status: "error",
        message: "Missing cancellation notes in body parameter",
      });
    }

    const updatedBooking = await Bookings.updateOne({ id: booking_id }).set({
      cancellation_note: cancellation_note,
      cancel_at: currentdatetime,
    });

    // Check if any booking was updated
    if (!updatedBooking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Pickup successfully cancelled",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Add Booking Service
// const addBookingService = async (req, res) => {
//   try {
//     const {
//       booking_id,
//       parenttrade_id,
//       quantity,
//       weight,
//       base_price,
//       amount,
//       add_on,
//       discount,
//       tax,
//       final_amount,
//     } = req.body;
//     const currentdatetime = new Date();

//     if (!booking_id || !parenttrade_id) {
//       return res.status(400).json({
//         status: "error",
//         message: "booking_id or parenttrade_id is missing in the request body",
//       });
//     }

//     if (!quantity) {
//       return res.status(400).json({
//         status: "error",
//         message: "quantity is missing in the request body",
//       });
//     }

//     if (!weight) {
//       return res.status(400).json({
//         status: "error",
//         message: "weight is missing in the request body",
//       });
//     }

//     if (!base_price) {
//       return res.status(400).json({
//         status: "error",
//         message: "base_price is missing in the request body",
//       });
//     }

//     if (!amount) {
//       return res.status(400).json({
//         status: "error",
//         message: "amount is missing in the request body",
//       });
//     }

//     if (!final_amount) {
//       return res.status(400).json({
//         status: "error",
//         message: "final_amount is missing in the request body",
//       });
//     }

//     if (!tax) {
//       return res.status(400).json({
//         status: "error",
//         message: "tax is missing in the request body",
//       });
//     }

//     if (!discount) {
//       return res.status(400).json({
//         status: "error",
//         message: "discount is missing in the request body",
//       });
//     }
//     const bookingExists = await Bookings_services.findOne({
//       booking_id: booking_id,
//     });

//     const parentTradeExists = await Bookings_services.findOne({
//       parenttrade_id: parenttrade_id,
//       booking_id: booking_id,
//     });

//     if (!bookingExists) {
//       return res.status(404).json({
//         status: "error",
//         message: "Booking id not found",
//       });
//     }

//     if (!parentTradeExists) {
//       return res.status(404).json({
//         status: "error",
//         message: "Parenttrade id not found",
//       });
//     }

//     const isParentTradeCount = await Bookings_services.count({
//       parenttrade_id: parenttrade_id,
//       booking_id: booking_id,
//     });

//     if (isParentTradeCount == 0) {
//       const insertBookingService = await Bookings_services.create(
//         {
//           parenttrade_id: parenttrade_id,
//         },
//         {
//           booking_id: booking_id,
//           quantity: quantity,
//           weight: weight,
//           base_price: base_price,
//           amount: amount,
//           add_on: add_on,
//           discount: discount,
//           tax: tax,
//           final_amount: final_amount,
//           updated_at: currentdatetime,
//         }
//       ).fetch();
//       console.log(insertBookingService);
//     } else {
//       return res.status(500).json({
//         status: "error",
//         message:
//           "More than one record found for the parenttrade_id and booking_id",
//       });
//     }

//     return res.status(200).json({
//       status: "success",
//       message: "Booking service inserted successfully",
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// Edit Booking Service
// const editBookingService = async (req, res) => {
//   try {
//     const {
//       id,
//       booking_id,
//       parenttrade_id,
//       quantity,
//       weight,
//       base_price,
//       amount,
//       add_on,
//       discount,
//       tax,
//       final_amount,
//     } = req.body;
//     const currentdatetime = new Date();

//     if (!booking_id || !parenttrade_id) {
//       return res.status(400).json({
//         status: "error",
//         message: "booking_id or parenttrade_id is missing in the request body",
//       });
//     }

//     if (!quantity) {
//       return res.status(400).json({
//         status: "error",
//         message: "quantity is missing in the request body",
//       });
//     }

//     if (!weight) {
//       return res.status(400).json({
//         status: "error",
//         message: "weight is missing in the request body",
//       });
//     }

//     if (!base_price) {
//       return res.status(400).json({
//         status: "error",
//         message: "base_price is missing in the request body",
//       });
//     }

//     if (!amount) {
//       return res.status(400).json({
//         status: "error",
//         message: "amount is missing in the request body",
//       });
//     }

//     if (!final_amount) {
//       return res.status(400).json({
//         status: "error",
//         message: "final_amount is missing in the request body",
//       });
//     }

//     if (!tax) {
//       return res.status(400).json({
//         status: "error",
//         message: "tax is missing in the request body",
//       });
//     }

//     if (!discount) {
//       return res.status(400).json({
//         status: "error",
//         message: "discount is missing in the request body",
//       });
//     }
//     const bookingservice_id = await Bookings_services.findOne({
//       id: id,
//     });

//     const bookingExists = await Bookings_services.findOne({
//       booking_id: booking_id,
//     });

//     const parentTradeExists = await Bookings_services.findOne({
//       parenttrade_id: parenttrade_id,
//       booking_id: booking_id,
//     });

//     if (!bookingservice_id) {
//       return res.status(404).json({
//         status: "error",
//         message: "BookingService_id not found",
//       });
//     }

//     if (!bookingExists) {
//       return res.status(404).json({
//         status: "error",
//         message: "Booking id not found",
//       });
//     }

//     if (!parentTradeExists) {
//       return res.status(404).json({
//         status: "error",
//         message: "Parenttrade id not found",
//       });
//     }

//     // Update the booking service
//     const updateResult = await Bookings_services.updateOne(
//       { id: id },
//       {
//         booking_id: booking_id,
//         quantity: quantity,
//         weight: weight,
//         base_price: base_price,
//         amount: amount,
//         add_on: add_on,
//         discount: discount,
//         tax: tax,
//         final_amount: final_amount,
//         updated_at: currentdatetime,
//       }
//     );

//     if (!updateResult) {
//       return res.status(500).json({
//         status: "error",
//         message: "Failed to update booking service",
//       });
//     }

//     return res.status(200).json({
//       status: "success",
//       message: "Booking service edited successfully",
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

// Confrim Pickup
const confirmPickup = async (req, res) => {
  try {
    const booking_id = req.body.booking_id;

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing booking id parameter",
      });
    }

    const bookingID = await Bookingdetails.findOne({
      booking_id: booking_id,
    });
    if (!bookingID) {
      return res.status(404).json({
        status: "error",
        message: "bookig id is not found",
      });
    }

    const updateObj = {
      pickup_done_at: new Date(),
      booking_id: booking_id,
    };

    const updatePickup = await Confirm_pickup.updateOne({
      booking_id: booking_id,
    }).set(updateObj);
    console.log(updatePickup);

    return res.status(200).json({
      status: "success",
      message: "Pickup Confirmed",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Deliver Order
const deliverOrder = async (req, res) => {
  try {
    const booking_id = req.body.booking_id;
    const currentdatetime = new Date();

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing booking id parameter",
      });
    }

    const bookingID = await Bookingdetails.findOne({
      booking_id: booking_id,
    });
    if (!bookingID) {
      return res.status(404).json({
        status: "error",
        message: "bookig id is not found",
      });
    }

    const status = 7;
    const updateDeliverOderBookings = await Bookings.updateOne({
      where: { id: booking_id },
    }).set({
      status: status,
      updated_at: currentdatetime,
    });

    const updateDeliverOderBookingDetails = await Bookingdetails.updateOne({
      where: { booking_id: booking_id },
    }).set({
      updated_at: currentdatetime,
    });

    return res.status(200).json({
      status: "success",
      message: "Deliver order completed",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Mark Payment
const markPayment = async (req, res) => {
  try {
    const { booking_id, amount, mode } = req.body;
    const paymentModes = [0, 1, 2, 3, 4, 5];

    if (!booking_id || !amount || !mode) {
      return res.status(400).json({
        status: "warning",
        message:
          "Either booking_id or amount or mode is missing in the body parameter",
      });
    }

    const bookingID = await Bookingdetails.findOne({
      booking_id: booking_id,
    });
    if (!bookingID) {
      return res.status(404).json({
        status: "error",
        message: "bookig id is not found",
      });
    }

    if (!paymentModes.includes(mode)) {
      return res.status(400).json({
        message: ["The payment mode you selected is not valid"],
        status: "warning",
      });
    }

    const updateObj = {
      updated_at: new Date(),
      amount,
      payment_status: mode,
    };

    const MarkPayment = await Bookings.updateOne({ id: booking_id }).set(
      updateObj
    );
    console.log(MarkPayment);

    res.status(200).json({
      message: "payment status updated successfully",
      status: "success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  getPickups,
  getDrop,
  getPickupOrderDetails,
  getDropOrderDetails,
  getSubTrades,
  getParentTrades,
  getAddonBasedOnParentTrades,
  getCloths,
  cancelPickup,
  // previewChallan,
  // addBookingService,
  // editBookingService,
  confirmPickup,
  deliverOrder,
  markPayment,
};
