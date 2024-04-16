const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
const extraPriceRoutes = require('./routes/extrapriceRoutes')
const orderRoutes = require('./routes/orderRoutes')
const contactUsRoutes = require('./routes/contactUsRoutes')

const app = express()

// Connect to Database
connectDB()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://ecommerce-frontend-amber-two.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/menuItem', menuItemRoutes)
app.use('/api/extraPrice', extraPriceRoutes)
app.use('/api/orderRoutes', orderRoutes)
app.use('/api/contactUsRoutes', contactUsRoutes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
