const mongoose = require('mongoose');
const DB = "marketplace";
const PASSWORD = "KelyanA0102!";

const URI = `mongodb+srv://nosdi:${PASSWORD}@cluster-clickcollect.b0zxk.mongodb.net/${DB}?retryWrites=true&w=majority`

const mongoDBClient = {
    initialize: () => {
        try {
            const client = mongoose.connect(URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            client.then(() => console.log(`Successfully connected to ${DB}`))
        } catch (err) {
            
        }
    }
}

module.exports = mongoDBClient;
