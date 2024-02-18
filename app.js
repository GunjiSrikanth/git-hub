const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your MongoDB URI)
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a TravelPost schema
const travelPostSchema = new mongoose.Schema({
    title: String,
    location: String,
    content: String,
});

const TravelPost = mongoose.model('TravelPost', travelPostSchema);

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API endpoint to get all travel blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await TravelPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to add a new travel blog post
app.post('/api/posts', async (req, res) => {
    const { title, location, content } = req.body;

    try {
        const newPost = new TravelPost({ title, location, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
