import mongoose from 'mongoose';

export class MongoDBClient {
    static async connect() {
        const connection = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: process.env.MONGODB_DB_NAME});
        console.log(`MongoDB está corriendo en: http://${connection.connection.host}:${connection.connection.port}`);
    }
}
