const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const upload = require('./controllers/imageUpload');
const studentRoutes = require('./routes/studentRoutes');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload);

//routes 
app.use("/api",studentRoutes);

app.use((request, response) => {
    response.status(404).json({ data: "Not Found" });
});

app.use((error, request, response, next) => {
    response.status(500).json({ data: `Error MW ${error}` });
});

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI ;
mongoose.connect(dbUrl, {})
    .then(() => {
        console.log('Connected to MongoDB');
        // connect to the database
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err);
    });