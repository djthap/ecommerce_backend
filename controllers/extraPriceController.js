const { MenuItem, ExtraPrice } = require('../models/menuItem');

const createExtraPrice = async (req, res) => {
    try {

        const { name, price } = req.body;
        const extraPrice = new ExtraPrice({ name, price });
        await extraPrice.save();
        res.status(200).json(extraPrice);
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
};

const updateExtraPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const extraPrice = await ExtraPrice.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!extraPrice) {
            return res.status(404).json({ message: 'ExtraPrice not found' });
        }
        res.json(extraPrice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteExtraPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const extraPrice = await ExtraPrice.findByIdAndDelete(id);
        if (!extraPrice) {
            return res.status(404).json({ message: 'ExtraPrice not found' });
        }
        res.json({ message: 'ExtraPrice deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllExtraPrices = async (req, res) => {
    try {
        const extraPrices = await ExtraPrice.find();
        res.status(200).json(extraPrices);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createExtraPrice,
    updateExtraPrice,
    deleteExtraPrice,
    getAllExtraPrices,
};
