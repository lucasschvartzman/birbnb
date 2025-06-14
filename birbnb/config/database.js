import mongoose from 'mongoose';

export class MongoDBClient {
    static async connect() {
        const uri = process.env.MONGODB_URI + "/" + process.env.MONGODB_DB_NAME;
        const connection = await mongoose.connect(uri);
        console.log(`MongoDB está corriendo en: http://${connection.connection.host}:${connection.connection.port}`);
    }
}
