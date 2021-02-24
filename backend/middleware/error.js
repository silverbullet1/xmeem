const logger = require("./../startup/logger");

module.exports = function(error, req, res, nxt) {
    // Invalid request
    logger.error("Error status: ", error.status);
    logger.error("Message: ", error.message);
    logger.error("Stack:",  error.stack);
    // res.setHeader('Content-Type', 'application/json');
    
    res.status(error.status || 500);
    // Sends response
    res.json({
      message: error.message,
    });
}