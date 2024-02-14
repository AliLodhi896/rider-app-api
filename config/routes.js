// config/routes.js
module.exports.routes = {
  "GET /": "MasterController.health", // Public Api
  // Auth
  "POST /api/sendOtp": "AuthController.sendOtp", // Public Api
  "POST /api/verifyOtp": "AuthController.verifyOtp", // Public Api
  "POST /api/setPassword": "AuthController.setPassword",
  "POST /api/login": "AuthController.login", // Public Api
  "POST /api/validateLogin": "AuthController.validateLogin",
  "POST /api/selfDeclaration": "AuthController.selfDeclaration",

  // BOOKINGS
  "GET /api/getPickups": "BookingsController.getPickups",
  "GET /api/getDrop": "BookingsController.getDrop",
  "GET /api/getPickupOrderDetails": "BookingsController.getPickupOrderDetails",
  "GET /api/getDropOrderDetails": "BookingsController.getDropOrderDetails",
  "GET /api/getSubTrades": "BookingsController.getSubTrades",
  "GET /api/getParentTrades": "BookingsController.getParentTrades",
  "GET /api/getCloths": "BookingsController.getCloths",
  "GET /api/previewChallan": "BookingsController.previewChallan",
  "GET /api/getAddonBasedOnParentTrades":
    "BookingsController.getAddonBasedOnParentTrades",

  "POST /api/cancelPickup": "BookingsController.cancelPickup",
  // "POST /api/addBookingService": "BookingsController.addBookingService",
  // "POST /api/editBookingService": "BookingsController.editBookingService",
  "POST /api/confirmPickup": "BookingsController.confirmPickup",
  "POST /api/deliverOrder": "BookingsController.deliverOrder",
  "POST /api/markPayment": "BookingsController.markPayment",

  // REPORT
  "GET /api/pickupSummary": "ReportController.pickupSummary",
  "GET /api/dropSummary": "ReportController.dropSummary",

  // CHALLAN
  "GET /api/getClothsChallan": "ChallanController.getClothsChallan",
  "POST /api/createChallan": "ChallanController.createChallan",
  "POST /api/addChallanServices": "ChallanController.addChallanServices",
};
