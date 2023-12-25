const mongoose = require('mongoose');

async function mongoDbConnection(URL) {
    try {
        await mongoose.connect(URL);
        console.log('DB Connected');
    } catch (error) {
        console.log('Database Connection failed', error);
    }
}

module.exports = mongoDbConnection;
