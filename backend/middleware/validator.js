const logger = require("../startup/logger");

const validatorMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      logger.error("error", message);
      if(property=="params") //Wrong ID
        res.status(404).json({ error: message });
      else  //Wrong body
        res.status(422).json({ error: message });
    }
  };
};
module.exports = validatorMiddleware;
