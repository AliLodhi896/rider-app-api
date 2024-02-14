// Create Challan Code
const createChallanCode = async (store_id, lastChallanCode = null) => {
  try {
    const storeCode = `UC${store_id}`;

    if (lastChallanCode) {
      const lastCodeParts = lastChallanCode.split("-");
      const lastNumber = parseInt(lastCodeParts[lastCodeParts.length - 1]);
      return `${storeCode}-${lastNumber + 1}`;
    } else {
      const lastChallan = await Challans.find({
        where: { store_id },
        sort: "id DESC",
      });
      if (lastChallan && lastChallan.length > 0) {
        const lastCodeParts = lastChallan[0].challan_code.split("-");
        const lastNumber = parseInt(lastCodeParts[lastCodeParts.length - 1]);
        return `${storeCode}-${lastNumber + 1}`;
      } else {
        return `${storeCode}-1101`;
      }
    }
  } catch (error) {
    throw error;
  }
};

// Create Challan
const createChallan = async (req, res) => {
  try {
    const { booking_id, webuser_id, services, store_id } = req.body;
    const currentDate = new Date();
    const status = "0";

    if (!booking_id || !webuser_id || !services || !store_id) {
      return res.status(400).json({
        status: "error",
        message:
          "booking_id, webuser_id, services, store_id are required fields in the request body",
      });
    }

    const token = req.headers.authorization;
    const tokenRecord = await Runners.findOne({
      token: token.replace("Bearer ", ""),
    });
    if (!tokenRecord) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Invalid token.",
      });
    }
    const runner_id = tokenRecord.id;
    const challan_code = await createChallanCode(store_id);

    // console.log("Creating Challans record...");
    const newChallan = await Challans.create({
      booking_id: booking_id,
      webuser_id: webuser_id,
      rider_id: runner_id,
      services: services,
      store_id: store_id,
      status: status,
      challan_code: challan_code,
      created_at: currentDate,
      updated_at: currentDate,
    }).fetch();

    // console.log("Challan created:", newChallan);
    return res.status(200).json({
      status: "success",
      message: "Challan created successfully!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get Cloths Challan
const getClothsChallan = async (req, res, next) => {
  try {
    const datastore = sails.getDatastore("default");
    const query = `SELECT 
            cc.id,
            cc.parenttrade_id,
            cc.category,
            cc.item,
            cc.status
        FROM 
            challan_cloths cc`;

    const clothsForChallan = await datastore.sendNativeQuery(query);
    return res.status(200).json({
      status: "success",
      cloths_challan: clothsForChallan.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Add Challan Services
const addChallanServices = async (req, res) => {
  try {
    const {
      challan_id,
      booking_id,
      challancloth_id,
      parenttrade_id,
      quantity,
      weight,
      addons,
      status,
    } = req.body;

    const currentDate = new Date();

    if (!challan_id) {
      return res.status(400).json({
        status: "error",
        message: "challan_id is missing in body parameter",
      });
    }

    if (!booking_id) {
      return res.status(400).json({
        status: "error",
        message: "booking_id is missing in body parameter",
      });
    }

    if (!challancloth_id) {
      return res.status(400).json({
        status: "error",
        message: "challancloth_id is missing in body parameter",
      });
    }

    if (!challancloth_id) {
      return res.status(400).json({
        status: "error",
        message: "challancloth_id is missing in body parameter",
      });
    }

    if (!parenttrade_id) {
      return res.status(400).json({
        status: "error",
        message: "parenttrade_id is missing in body parameter",
      });
    }

    if (!quantity) {
      return res.status(400).json({
        status: "error",
        message: "quantity is missing in body parameter",
      });
    }

    if (!weight) {
      return res.status(400).json({
        status: "error",
        message: "weight is missing in body parameter",
      });
    }

    if (!addons) {
      return res.status(400).json({
        status: "error",
        message: "addons is missing in body parameter",
      });
    }

    if (!status) {
      return res.status(400).json({
        status: "error",
        message: "status is missing in body parameter",
      });
    }

    const token = req.headers.authorization;
    const tokenRecord = await Runners.findOne({
      token: token.replace("Bearer ", ""),
    });
    if (!tokenRecord) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Invalid token.",
      });
    }
    const rider_id = tokenRecord.id;

    const challanServices = await Challan_services.create({
      booking_id: booking_id,
      challan_id: challan_id,
      rider_id: rider_id,
      challancloth_id: challancloth_id,
      challan_id: challan_id,
      parenttrade_id: parenttrade_id,
      quantity: quantity,
      weight: weight,
      addons: addons,
      status: status,
      challan_id: challan_id,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return res.status(200).json({
      status: "success",
      message: "add challan services successfully",
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
  getClothsChallan,
  createChallan,
  addChallanServices,
};
