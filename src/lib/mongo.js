import mongoose from "mongoose";

let isConnectedBefore = false;

async function dbConnect () {
    mongoose.set('strictQuery', true);  
    if (mongoose.connection.readyState === 1) {
        console.log('Using existing database connection.');
        return;
    }

    if (mongoose.connection.readyState === 2) {
        console.log('Connection is currently being established.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'ufc',  
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnectedBefore = true;
        console.log('Database connection established.');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1);  
    }

    mongoose.connection.on('connected', () => {
        isConnectedBefore = true;
        console.log('Mongoose connected to db.');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        if (!isConnectedBefore) {
            process.exit(1);
        }
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected.');
    });
};

export default dbConnect;