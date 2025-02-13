import { Schema, model } from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;
import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error({error:'Invalid Email'});
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await user.findOne({ email });
    if (!user) {
        throw new Error({error: 'Login failed! Check authentication credentials'});
    }
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Login failed! Check authentication credentials' });
    }

    return user;
};

const User = model('User', userSchema);

export default User;