const Joi = require("joi");
const mongoose = require("mongoose");
const normalize = require('normalize-mongoose');
const createError = require("http-errors");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const pageNumber = 1;
const pageSize = 100;

const memeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String, required: true },
  },
  { timestamps: true }
);

memeSchema.plugin(normalize);
const Meme = mongoose.model("Memes", memeSchema);

/**
 * Adds a new meme to the DB
 * 
 * @param {string} name The person who added the meme
 * @param {string} url The URL of the meme
 * @param {string} caption The caption added for the meme
 * @returns {Object}
 */
async function createMeme(name, url, caption) {
  const meme = { name: name, url: url, caption: caption };
  if (!await isDuplicate(meme)) {
    const entry = new Meme(meme);
    return await entry.save();
  }
}

/**
 * Returns the details of a particular ID or top 100 by default
 * 
 * @param [id] id The id of the meme to fetch details for
 * @returns {Array.<Object>} / {}
 * @throws {404} When the meme is not found.
 */
async function getMeme(id) {
  let memes = [];
  // No id, so return top 100 memes
  if (!id) {
    memes = await Meme.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({updatedAt: -1 })
      .select({ id: 1, name: 1, caption: 1, url: 1 });
  return memes ? memes : [];
  }

  // Id present and valid
  else {
    memes = await Meme.findById(id).select({
      id: 1,
      name: 1,
      caption: 1,
      url: 1,
    });
  }
  if(!memes) throw createError(404, "Invalid ID");
  return memes;
  // Id present & valid but no entry found
}

/**
 * Checks if the same combination of name, url & caption already exists
 * 
 * @param {Object} meme The meme to search for
 * @returns {Boolean}
 */
async function checkDuplicatePayload(meme) {
  //If the entire payload is repeated
  const existingMeme = await Meme.find({
    $and: [{ name: meme.name }, { caption: meme.caption }, { url: meme.url }],
  });
  if (existingMeme.length === 0) {
    //This is a brand new payload
    return false;
  }
  return true;
}

/**
 * Checks if any meme with given ID exists or not
 * 
 * @param {id} id The id of the meme to search for
 * @returns {Boolean}
 */
async function doesMemeExist(id) {
  return await Meme.findById(id);
}

/**
 * Updates the meme's URL/caption(or both) for the given ID
 * 
 * @param {id} id The id of the meme to search for
 * @param {Object} meme The meme to update
 * @returns {Object}
 * @throws {404} When the meme is not found.
 */
async function updateMeme(id, newMeme) {
  // Check whether this is a valid meme ID
  const existingMeme = await doesMemeExist(id);
  if (!existingMeme)
    throw createError(404, "The specified meme ID doesn't exist.");

  // Construct the updated meme after update
  const updatedMeme = {
    id: id,
    name: existingMeme.name,
    caption: newMeme.caption ? newMeme.caption : existingMeme.caption,
    url: newMeme.url ? newMeme.url : existingMeme.url,
  };

  //Validate this meme
  if (! await isDuplicate(updatedMeme)) {
    existingMeme.set({
      caption: updatedMeme.caption,
      url: updatedMeme.url,
    });

    //Write to DB finally
    return await existingMeme.save();
  }
}

/**
 * To check whether there is an existing meme with the same deatils
 * 
 * @param {Object} meme The meme to check for
 * @returns {Boolean}
 * @throws {409} If there is an existing meme
 */
async function isDuplicate(meme) {
  // Checking for duplicate payload
  const response = await checkDuplicatePayload(meme);
  if (response) {
    throw createError(409, "You cannot submit the same thing again!");
  }
  return false;
}

module.exports = { getMeme, createMeme, updateMeme };
