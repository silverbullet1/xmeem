const Joi = require("joi");
const urlExistSync = require("url-exist-sync");
const isImageURL = require("is-image-url");
Joi.objectId = require("joi-objectid")(Joi);

const schemas = {
  postMeme: Joi.object({
    name: Joi.string().required()
    .messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
        "any.required": `"name" is a required field`
      }),
    caption: Joi.string().required()    
    .messages({
        "string.base": `"caption" should be a type of 'text'`,
        "string.empty": `"caption" cannot be an empty field`,
        "any.required": `"caption" is a required field`
      }),
    url: Joi.string().uri()
      .messages({
          "string.base": `"url" should be a type of 'text'`,
          "string.empty": `"url" cannot be an empty field`,
          "string.uri": `"url" is not valid`,
        })
      .required()
      .custom((value, helpers) => {
        //Check if its a valid URL and points to an image
        if (!isImageURL(value)) {
          return helpers.message("Invalid meme URL");
        }
      }),
  }),

  updateMeme: Joi.object({
    caption: Joi.string()    
    .messages({
        "string.base": `"caption" should be a type of 'text'`,
        "string.empty": `"caption" cannot be an empty field`,
      }),
    url: Joi.string().uri()
    .messages({
        "string.base": `"url" should be a type of 'text'`,
        "string.empty": `"url" cannot be an empty field`,
        "string.uri": `"url" is not valid`,
      })
      .custom((value, helpers) => {
        //Check if its a valid URL and points to an image
        if (!isImageURL(value)) {
           return helpers.message(422, "Invalid meme URL");
        }
      }),
  }),

  getMeme: Joi.object({
    id: Joi.objectId()
    .message("Please enter a valid ID")
  }),
  // define all the other schemas below
};
module.exports = schemas;
