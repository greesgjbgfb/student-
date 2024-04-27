const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.jcoiigm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}
connectDB();

// Signup route
app.post('/signup', async (req, res) => {
  const credentials = req.body;

  try {
    // Example: Save to MongoDB
    await client.db('your_database_name').collection('users').insertOne(credentials);
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: "Signup failed." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
