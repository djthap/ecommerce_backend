const cloudinary = require('cloudinary')
const { MenuItem } = require('../models/menuItem')
const multer = require('multer')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Cloudinary configuration
cloudinary.config({
	cloud_name: 'db4apiuz9',
	api_key: '393969134613339',
	api_secret: '8MWM_jIXVEhUYPsCQuqvrLcd9iY',
})

// Multer configuration for file upload
const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage }).single('image')

const uploadImage = async (req, res) => {
  try {
      upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
              return res.status(400).json({ error: 'Multer error: ' + err.message });
          } else if (err) {
              return res.status(500).json({ error: 'An error occurred while uploading the image' });
          }

          const result = await cloudinary.uploader.upload(req.file.path);

          fs.unlinkSync(req.file.path);

          res.status(200).json({ imageUrl: result.secure_url });
      });
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'An error occurred while uploading the image' });
  }
};


const getAllMenuItems = async (req, res) => {
	try {
		const menuItems = await MenuItem.find()
			.populate('category', 'category_name')
			.populate('createdBy', 'name')
			.populate('sizes', 'name price'  )
			.populate('extraIngredientPrices', 'name  price')
		console.log(menuItems)
		res.status(200).json(menuItems)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const getRandomMenuItems = async (req, res) => {
	try {
		const randomMenuItems = await MenuItem.aggregate([
			{ $sample: { size: 5 } },
		])

		res.status(200).json(randomMenuItems)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const createMenuItem = async (req, res) => {
	try {
		const token = req.header('Authorization')
		const decoded = jwt.verify(token, 'this-is-our-web-app')
		const createdBy = decoded.user.id

		const {
			name,
			description,
			category,
			basePrice,
			sizes,
			extraIngredientPrices,
			image,
		} = req.body

		try {
			const menuItem = new MenuItem({
				image,
				name,
				description,
				category,
				basePrice,
				sizes,
				extraIngredientPrices,
				createdBy,
			})

			await menuItem.save()

			return res
				.status(201)
				.json({ message: 'MenuItem created successfully', menuItem })
		} catch (error) {
			return res.status(500).json({ error: 'Failed to create menu item' })
		}
	} catch (error) {
		console.error('Error creating menu item:', error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}

module.exports = {
	createMenuItem,
}

const updateMenuItem = async (req, res) => {
	try {
		const { id } = req.params
		const token = req.header('Authorization')
		const decoded = jwt.verify(token, 'this-is-our-web-app')

		const createdBy = decoded.user.id

		const {
			image,
			name,
			description,
			category,
			basePrice,
			sizes,
			extraIngredientPrices,
		} = req.body

		const updatedMenuItem = await MenuItem.findByIdAndUpdate(
			id,
			{
				image,
				name,
				description,
				category,
				basePrice,
				sizes,
				extraIngredientPrices,
				createdBy,
			},
			{ new: true }
		)
		if (!updatedMenuItem) {
			return res.status(404).json({ message: 'MenuItem not found' })
		}
		res.status(200).json({
			message: 'MenuItem updated successfully',
			updatedMenuItem,
		})
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const deleteMenuItem = async (req, res) => {
	try {
		const { id } = req.params
		const deletedMenuItem = await MenuItem.findByIdAndDelete(id)
		if (!deletedMenuItem) {
			return res.status(404).json({ message: 'MenuItem not found' })
		}
		res.status(200).json({
			message: 'MenuItem deleted successfully',
			deletedMenuItem,
		})
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}
const getMenuItemsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const menuItems = await MenuItem.find({ category: categoryId })
            .populate('category', 'category_name')
            .populate('sizes', 'name price')
            .populate('extraIngredientPrices', 'name price')
            .populate('createdBy', 'name');

        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error filtering menu items by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMenuItemById = async (req, res) => {
	try {
		const { id } = req.params
		const menuItem = await MenuItem.findById(id).populate('category', 'category_name')
		.populate('sizes', 'name price'  )
		.populate('extraIngredientPrices', 'name  price')
		if (!menuItem) {
			return res.status(404).json({ message: 'MenuItem not found' })
		}
		res.status(200).json(menuItem)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}
const searchMenuItemsByName = async (req, res) => {
    try {
        const { name } = req.query;
       const menuItems = await MenuItem.find({ name: { $regex: new RegExp(name, "i") } })
            .populate('category', 'category_name')
            .populate('sizes', 'name price')
            .populate('extraIngredientPrices', 'name price')
            .populate('createdBy', 'name');
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error searching menu items by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
	getAllMenuItems,
	createMenuItem,
	updateMenuItem,
	deleteMenuItem,
	getMenuItemById,
	getRandomMenuItems,
	uploadImage,
	getMenuItemsByCategory,
	searchMenuItemsByName
}
