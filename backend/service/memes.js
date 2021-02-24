const express = require("express");
const router = express.Router();
const MemeUtils = require("./MemeUtils");
const validatorMiddleware = require("../middleware/validator")
const schemas = require("./../data/schemas");

router.get(
  "/:id?",
  validatorMiddleware(schemas.getMeme, 'params'),
  async (req, res) => {
    const result = await MemeUtils.getMeme(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(result));
    res.status(200).end();
  }
);

router.patch(
  "/:id",
  validatorMiddleware(schemas.getMeme, 'params'),
  validatorMiddleware(schemas.updateMeme, 'body'), async (req, res) => {
    const meme = {
      url: req.body.url,
      caption: req.body.caption,
    };
    await MemeUtils.updateMeme(req.params.id, meme);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end();
  }
);

router.post(
  "/",
  validatorMiddleware(schemas.postMeme, 'body'),
  async (req, res) => {
    const meme = {
      name: req.body.name,
      url: req.body.url,
      caption: req.body.caption,
    };
    const entry = await MemeUtils.createMeme(meme.name, meme.url, meme.caption);
    const result = {
      id: entry._id,
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(201).end(JSON.stringify(result));
  }
);

// Fail safe routes
router.all("/", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(405).end(JSON.stringify("Invalid endpoint"));
}
);
router.all("/*", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(405).end(JSON.stringify("Invalid endpoint"));
}
);

module.exports = router;
