const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    mongodb_url : process.env.MONGODB_URL
};
