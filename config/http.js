module.exports.http = {
  middleware: {
    order: [
      "authentication",
      "requestResponseLogger",
      "cookieParser",
      "session",
      "bodyParser",
      "compress",
      "poweredBy",
      "router",
      "www",
      "favicon",
    ],
    requestResponseLogger: require("../api/middleware/requestResponseLogger"),
    authentication: require("../api/middleware/auth"),
  },
};
