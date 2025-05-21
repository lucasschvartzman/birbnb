import mongoose from 'mongoose';

export class ClienteMongoDB {
    static async conectar() {
        try {
            const uri = process.env.MONGODB_URI + "/" + process.env.MONGODB_DB_NAME;
            const connection = await mongoose.connect(uri);
            console.log(`MongoDB está corriendo en: ${connection.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}