import dotenv from 'dotenv'; // Import dotenv
import express, { urlencoded, json } from 'express';
import userRouter from './routers/user.js'; // Import the user router
import './db/db.js'; // This will run the code in db.js

// Load environment variables from .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || 3000;
console.log('MongoDB URL:', process.env.MONGODB_URL); // Check if it's loaded correctly

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use(userRouter); // Use the user router with the /users prefix

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});