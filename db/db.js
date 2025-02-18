import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
        console.error('Error: MONGODB_URL environment variable is not defined.');
        process.exit(1); // Exit process with failure
    }

    try {
        await connect(mongoURI, { 
            // These options are deprecated for this new version of Mongoose
                // useNewUrlParser: true,
                // useCreateIndex: true, 
                // useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();