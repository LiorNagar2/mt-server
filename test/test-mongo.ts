import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // Avoid deprecation warning

mongoose.connect('mongodb://127.0.0.1:27017/master')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });