const config = require('config');
const createError = require("http-errors");

module.exports = function() {
    if(!config.get('DB_URL')) {
        throw createError(500, JSON.stringify('App configuration is missing.'));
    }
}