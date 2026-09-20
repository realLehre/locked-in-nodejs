import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']);
import mongoose from 'mongoose'

const connectToDb = (uri) => {
    return mongoose.connect(uri)
}

export default connectToDb;
