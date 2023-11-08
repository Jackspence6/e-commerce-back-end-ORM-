const router = require("express").Router();
const { where } = require("sequelize");
const { Tag, Product, ProductTag } = require("../../models");

// Find all Tags
router.get("/", async (req, res) => {
	try {
		const tagData = await Tag.findAll({
			// Including associated Product
			include: [
				{
					model: Product,
					through: ProductTag,
					as: "associated_Product",
				},
			],
		});
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Find a single tag by its Id
router.get("/:id", async (req, res) => {
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			// Including associated Product
			include: [
				{
					model: Product,
					through: ProductTag,
					as: "associated_Product",
				},
			],
		});
		// Checking to see if there is a corresponding Tag to the Id being fetched
		if (!tagData) {
			res.status(404).json({ message: "No Tag found matching this Id!" });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create a new tag
router.post("/", async (req, res) => {
	try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update a tag's name by its Id value
router.put("/:id", async (req, res) => {
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		// Checking to see if there is a corresponding Tag to the Id being Updated
		if (!tagData) {
			res.status(404).json({ message: "No Tag found matching this Id!" });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete one tag by its Id value
router.delete("/:id", async (req, res) => {
	try {
		const tagData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		// Checking to see if there is a corresponding Tag to the Id being deleted
		if (!tagData) {
			res.status(404).json({ message: "No Tag found matching this Id!" });
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
