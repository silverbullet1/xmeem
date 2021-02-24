const express = require('express');
const app = express()
const logger = require('./startup/logger')
require('./startup/routes')(app)
require('./startup/database')()
require('./startup/config')
require('./startup/swagger')();
require('./startup/prod')(app)

const port = process.env.PORT || 8081
app.get('*', function(req, res){
    res.send('This route is not yet implemented!', 415);
  });

var server = app.listen(port, () => {
    logger.info(`XMeme listening on port ${port}`)
});

module.exports = server
