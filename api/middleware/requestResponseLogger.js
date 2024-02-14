// api/middleware/requestResponseLogger.js
module.exports = async function (request, response, next) {
  // Log the incoming request details
  sails.log.info(
    `[${new Date().toISOString()}] Incoming request: ${request.method} ${
      request.url
    }`
  );

  // Store the original response.end method
  const originalResponseEnd = response.end;

  // Override response.end to log the response details
  response.end = function (data, encoding) {
    // Log the response details
    sails.log.info(
      `[${new Date().toISOString()}] Outgoing response: ${response.statusCode}`
    );

    // Call the original response.end method
    originalResponseEnd.call(this, data, encoding);
  };

  return next();
};
