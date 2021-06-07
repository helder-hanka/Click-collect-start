const mongoose = require('mongoose');
require('dotenv').config();
const { REACT_APP_DB,  REACT_APP_PASSWORD } = process.env

// const URI = `mongodb+srv://nosdi:${PASSWORD}@cluster-clickcollect.b0zxk.mongodb.net/${DB}?retryWrites=true&w=majority`
const URI = `mongodb+srv://nosdi:${REACT_APP_PASSWORD}@cluster-clickcollect.b0zxk.mongodb.net/${REACT_APP_DB}?retryWrites=true&w=majority`

const mongoDBClient = {
    initialize: () => {
        try {
            const client = mongoose.connect(URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            client.then(() => console.log(`Successfully connected to ${REACT_APP_DB}`))
        } catch (err) {
            
        }
    }
}

module.exports = mongoDBClient;
