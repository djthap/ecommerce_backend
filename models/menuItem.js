const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define ExtraPriceSchema
const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

// Define MenuItemSchema
const menuItemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    basePrice: { type: Number },
    sizes: [{ type: Schema.Types.ObjectId, ref: 'ExtraPrice' }], 
    extraIngredientPrices: [{ type: Schema.Types.ObjectId, ref: 'ExtraPrice' }], 
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
}, { timestamps: true });

const ExtraPrice = mongoose.model('ExtraPrice', ExtraPriceSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = { MenuItem, ExtraPrice };
