const router = require("express").Router();
const { Category, Product } = require("../../models");

// Get all Categories
router.get("/", async (req, res) => {
	// Finding all categories
	try {
		const categoryData = await Category.findAll({
			// Including associated Products
			include: [
				{
					model: Product,
				},
			],
		});
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get one Category
router.get("/:id", async (req, res) => {
	// Finding one category by its Id value
	try {
		const categoryData = await Category.findByPk(req.params.id, {
			// Including associated Products
			include: [
				{
					model: Product,
				},
			],
		});
		// Checking to see if there is a corresponding Category to the Id being fetched
		if (!categoryData) {
			res.status(404).json("No Category found matching this Id!");
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create a new Category
router.post("/", async (req, res) => {
	try {
		const categoryData = await Category.create(req.body);
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update a category by its Id value
router.put("/:id", async (req, res) => {
	try {
		const categoryData = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		// Checking to see if there is a corresponding Category to the Id being Updated
		if (!categoryData) {
			res.status(404).json("No Category found matching this Id!");
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete a category by its Id value
router.delete("/:id", async (req, res) => {
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		// Checking to see if there is a corresponding Category to the Id being Deleted
		if (!categoryData) {
			res.status(404).json("No Category found matching this Id!");
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
