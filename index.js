const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const extraPriceRoutes = require('./routes/extrapriceRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: 'https://ecommerce-frontend-amber-two.vercel.app',
        optionsSuccessStatus: 200,
        allowedOrigins: ["https://ecommerce-frontend-amber-two.vercel.app"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers',
        ],
        credentials: true,
    })
)
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menuItem', menuItemRoutes);
app.use('/api/extraPrice', extraPriceRoutes);
app.use('/api/orderRoutes', orderRoutes);
app.use('/api/contactUsRoutes', contactUsRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));