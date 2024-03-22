const Category = require('../models/Category');

const createCategory = async (req, res) => {
    try {
      
      const totalCategories = await Category.countDocuments();
  
      const category_id = totalCategories + 1;
  
      const { category_name } = req.body;
  
      const category = new Category({ category_id, category_name });
  
     
      await category.save();
  
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

 const getCategory = async (req, res) => {
    try {
     
        const category = await Category.find({});
        
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
 const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;
        const category = await Category.findByIdAndUpdate(id, { category_name }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
};
