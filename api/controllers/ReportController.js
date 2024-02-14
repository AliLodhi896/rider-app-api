// Pickup Summary
const pickupSummary = async (req, res) => {
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
    whereClause += ` AND (bd.pickup_date >= '${from_date}' AND bd.pickup_date <= '${to_date}')`;

    // Search by booking_code, name, and mobile
    const searchQuery = req.query.search;
    if (searchQuery) {
      whereClause += ` AND (b.booking_code LIKE '%${searchQuery}%' OR wu.name LIKE '%${searchQuery}%' OR wu.mobile LIKE '%${searchQuery}%')`;
    }

    // const query = ` SELECT
    //                   b.id, b.booking_code, b.booking_type,
    //                   wu.name, wu.email, wu.mobile,
    //                   bd.total_cloth
    //                 FROM bookings b
    //                 LEFT JOIN webusers wu ON (b.webuser_id = wu.id)
    //                 LEFT JOIN addresses a ON (b.address_id = a.id)
    //                 LEFT JOIN cities c ON (a.city_id = c.id)
    //                 LEFT JOIN bookingdetails bd ON (b.id = bd.booking_id)
    //                 WHERE
    //                   b.pickup_boy_id = ${pickup_boy_id} AND b.status = 2
    //                   AND (bd.pickup_date >= '${from_date}' AND bd.pickup_date <= '${to_date}')
    //                 ORDER BY
    //                   bd.pickup_date ASC, b.booking_code ASC
    //                 LIMIT 0, 10`;

    const query = `SELECT
                      b.id, b.booking_code, b.booking_type,
                      wu.name, wu.email, wu.mobile,
                      bd.total_cloth
                    FROM bookings b
                    LEFT JOIN webusers wu ON (b.webuser_id = wu.id)
                    LEFT JOIN addresses a ON (b.address_id = a.id)
                    LEFT JOIN cities c ON (a.city_id = c.id)
                    LEFT JOIN bookingdetails bd ON (b.id = bd.booking_id)
                    ${whereClause}
                    ORDER BY
                      bd.pickup_date ASC, b.booking_code ASC
                    LIMIT 0, 10`;
    const pickups = await datastore.sendNativeQuery(query);

    for (const pickup of pickups.rows) {
      const id = pickup.id;

      // const bookingsServiceQuery = `SELECT * FROM bookings_services WHERE booking_id = ${id}`;

      const bookingsServiceQuery = `
      SELECT  pt.name AS parenttrades, pt.quantity_based_service
      FROM bookings_services bs
      LEFT JOIN parenttrades pt ON bs.parenttrade_id = pt.id
      WHERE bs.booking_id = ${id}
    `;

      const bookingsService = await datastore.sendNativeQuery(
        bookingsServiceQuery
      );
      pickup.bookings_services = bookingsService.rows;
    }

    return res.status(200).json({
      status: "success",
      pickup_summary: pickups.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Drop Summary
const dropSummary = async (req, res) => {
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
    const drop_boy_id = runner.id;
    let whereClause = `where b.drop_boy_id = ${drop_boy_id} AND b.status = 5`;
    whereClause += ` AND (bd.delivery_date >= '${from_date}' AND bd.delivery_date <= '${to_date}')`;

    const searchQuery = req.query.search;
    if (searchQuery) {
      whereClause += ` AND (b.booking_code LIKE '%${searchQuery}%' OR wu.name LIKE '%${searchQuery}%' OR wu.mobile LIKE '%${searchQuery}%')`;
    }

    // const query = `SELECT
    //     b.id,b.booking_code, b.booking_type,
    //     wu.name, wu.email, wu.mobile,
    //     bd.total_cloth
    // FROM bookings b
    // LEFT JOIN webusers wu ON (b.webuser_id = wu.id)
    // LEFT JOIN addresses a ON (b.address_id = a.id)
    // LEFT JOIN cities c ON (a.city_id = c.id)
    // LEFT JOIN bookingdetails bd ON (b.id = bd.booking_id)
    // WHERE
    //     b.pickup_boy_id = ${drop_boy_id} AND b.status = 5
    //     AND (bd.delivery_date >= '${from_date}' AND bd.delivery_date <= '${to_date}')
    //     ORDER BY
    //     bd.delivery_date ASC, b.booking_code ASC
    // LIMIT 0, 10`;

    const query = `SELECT
                      b.id, b.booking_code, b.booking_type,
                      wu.name, wu.email, wu.mobile,
                      bd.total_cloth
                    FROM bookings b
                    LEFT JOIN webusers wu ON (b.webuser_id = wu.id)
                    LEFT JOIN addresses a ON (b.address_id = a.id)
                    LEFT JOIN cities c ON (a.city_id = c.id)
                    LEFT JOIN bookingdetails bd ON (b.id = bd.booking_id)
                    ${whereClause}
                    ORDER BY
                      bd.delivery_date ASC, b.booking_code ASC
                    LIMIT 0, 10`;

    const drops = await datastore.sendNativeQuery(query);

    for (const drop of drops.rows) {
      const id = drop.id;
      // const bookingsServiceQuery = `SELECT * FROM bookings_services WHERE booking_id = ${id}`;

      const bookingsServiceQuery = `
    SELECT  pt.name AS parenttrades, pt.quantity_based_service
    FROM bookings_services bs
    LEFT JOIN parenttrades pt ON bs.parenttrade_id = pt.id
    WHERE bs.booking_id = ${id}
  `;

      const bookingsService = await datastore.sendNativeQuery(
        bookingsServiceQuery
      );
      drop.bookings_services = bookingsService.rows;
    }
    return res.status(200).json({
      status: "success",
      drops_summary: drops.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  pickupSummary,
  dropSummary,
};
